import immutable from 'immutability-helper';
import React, { useContext, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import { X, ThreeDotsVertical } from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Container, Close, FloatingButton, MenuItem } from './styles';
import Backdrop from '../../../../../../components/Backdrop';

import AuthContext from '../../../../../../context/auth';
import DataContext from '../../../../../../context/data';
import UsersContext from '../../../../context';
import { User } from '../../../../../../models/User';
import { useFetch } from '../../../../../../hooks';

const Options: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const { users, setUsers } = useContext(DataContext);
  const { token } = useContext(UsersContext);

  const [current, setCurrent] = useState<null | User>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      const user = users.find(({ token: userToken }) => token === userToken) ?? null;
      setCurrent(user);
    } else setCurrent(null);
  }, [users, token]);

  const onDismiss = () => setIsOpen(false);

  if (!current) return <></>;

  const changeStatus = () => {
    if (current) {
      useFetch.post(`/m/u/${secret}`, { token: current.token, status: current.status === 1 ? 0 : 1 }, (response) => {
        if (response.code === 'success') {
          const index = users.findIndex(({ token: userToken }) => userToken === current.token);
          setUsers(immutable(users, { [index]: { $set: { ...current, status: current.status === 1 ? 0 : 1 } } }));
        } else {
          alert('error');
        }
      });
    }
  };

  return (
    <Portal>
      <AnimateSharedLayout type="crossfade">
        <FloatingButton layoutId="float-btn" onClick={() => setIsOpen(true)}>
          <ThreeDotsVertical size={25} color="white" />
        </FloatingButton>

        <AnimatePresence>
          {
            isOpen && (
              <Backdrop onMouseDown={onDismiss}>
                <Container layoutId="float-btn">
                  <Close>
                    <X size={25} onClick={onDismiss} style={{ cursor: 'pointer' }} />
                  </Close>
                  <MenuItem onClick={changeStatus}>
                    { current.status ? 'Desativar usuário' : 'Reativar usuário' }
                  </MenuItem>
                  <MenuItem>Mudar senha</MenuItem>
                </Container>
              </Backdrop>
            )
          }
        </AnimatePresence>
      </AnimateSharedLayout>
    </Portal>
  );
};

export default Options;
