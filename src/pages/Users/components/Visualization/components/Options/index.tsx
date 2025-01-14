import immutable from 'immutability-helper';
import React, { useContext, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import { X, ThreeDotsVertical } from 'react-bootstrap-icons';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Container, Close, FloatingButton, MenuItem, PassModal, TextInput, Button } from './styles';
import Alert from '../../../../../../components/Alert';
import Backdrop from '../../../../../../components/Backdrop';

import AuthContext from '../../../../../../context/auth';
import DataContext from '../../../../../../context/data';
import UsersContext from '../../../../context';
import { User } from '../../../../../../models/User';
import { useFetch } from '../../../../../../hooks';

interface Props {
  findTree: () => void
}

const Options: React.FC<Props> = ({ findTree }) => {
  const { secret } = useContext(AuthContext);
  const { users, setUsers } = useContext(DataContext);
  const { token, setIsDetailOpened } = useContext(UsersContext);

  const [current, setCurrent] = useState<null | User>(null);
  const [password, setPassword] = useState<string>('');
  const [indicatedBy, setIndicatedBy] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [changingPassword, setChangingPassword] = useState<boolean>(false);
  const [changingPasswordError, setChangingPasswordError] = useState<null | string>(null);

  const [changingIndicatedBy, setChangingIndicatedBy] = useState<boolean>(false);
  const [changingIndicatedByError, setChangingIndicatedByError] = useState<null | string>(null);

  useEffect(() => {
    if (token) {
      const user = users.find(({ token: userToken }) => token === userToken) ?? null;
      setCurrent(user);
      setIndicatedBy(user?.indicatedBy ? user.indicatedBy : '');
    } else {
      setCurrent(null);
      setIndicatedBy('');
    }
  }, [users, token]);

  const onDismiss = () => {
    setIsOpen(false);
    if (changingPassword) setChangingPassword(false);
    if (changingIndicatedBy) setChangingIndicatedBy(false);
  };

  if (!current) return <></>;

  const updatePassword = () => {
    const { secret, token } = current;

    if (!password || password.length < 8 || password.length > 20) {
      return setChangingPasswordError('A senha deve ter entre 8 e 20 caracteres');
    }

    useFetch.post(`/u/${token}/${secret}`, {
      user: { ...current, password }
    }, (response) => {
      setChangingPassword(false);
    });
  };

  const updateIndicatedBy = () => {
    const { secret, token } = current;

    useFetch.post(`/u/${token}/${secret}`, {
      user: { ...current, indicatedBy: indicatedBy.toLowerCase() }
    }, (response) => {
      setChangingIndicatedBy(false);
      findTree();
    });
  };

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
                {
                  changingPassword && (
                    <Backdrop>
                      <Alert visible={Boolean(changingPasswordError)} onDismiss={() => setChangingPasswordError(null)} timeout={4000}>
                        { changingPasswordError }
                      </Alert>
                      <PassModal>
                        <p style={{ marginTop: 0 }}>Mudar senha</p>
                        <TextInput value={password} onChange={e => setPassword(e.target.value)} type="text" />
                        <Button onClick={updatePassword}>Salvar</Button>
                      </PassModal>
                    </Backdrop>
                  )
                }

                {
                  changingIndicatedBy && (
                    <Backdrop>
                      <Alert visible={Boolean(changingIndicatedByError)} onDismiss={() => setChangingIndicatedByError(null)} timeout={4000}>
                        { changingIndicatedByError }
                      </Alert>
                      <PassModal>
                        <p style={{ marginTop: 0 }}>Mudar indicação</p>
                        <TextInput value={indicatedBy} onChange={e => setIndicatedBy(e.target.value)} type="text" />
                        <Button onClick={updateIndicatedBy}>Salvar</Button>
                      </PassModal>
                    </Backdrop>
                  )
                }

                <Container layoutId="float-btn">
                  <Close>
                    <X size={25} onClick={onDismiss} style={{ cursor: 'pointer' }} />
                  </Close>
                  <MenuItem style={{ color: current.status ? 'black' : 'red' }} onClick={() => setIsDetailOpened(true)}>Detalhes</MenuItem>
                  <MenuItem onClick={changeStatus}>
                    { current.status ? 'Desativar usuário' : 'Reativar usuário' }
                  </MenuItem>
                  <MenuItem onClick={() => setChangingPassword(true)}>Mudar senha</MenuItem>
                  <MenuItem onClick={() => setChangingIndicatedBy(true)}>Mudar indicação</MenuItem>
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
