import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from '../../../hooks';
import { Container, ListItem, Column } from './styles';
import update from 'immutability-helper';

import AuthContext from '../../../context/auth';
import { User } from '../../../models/User';
import { Button } from '../Recommendations/styles';
import Alert from '../../../components/Alert';

const Registers: React.FC = () => {
  const { secret } = useContext(AuthContext);
  const [users, setUsers] = useState<Array<User>>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    useFetch.get(`/m/u/n/${secret}`, (response) => {
      setUsers(response.users);
    });
  }, []);

  const ativateUser = (token: string) => {
    useFetch.get(`/m/u/a/${token}/${secret}`, (response) => {
      if (response.code === 'error') {
        return setError('Não foi possível ativar o usuário, por favor, entre em contato com o desenvolvedor caso o problema continue');
      }

      const index = users.findIndex(({ token: userToken }) => userToken === token);
      setUsers(update(users, {
        $splice: [[index, 1]]
      }));
    });
  };

  return (
    <Container>
      <Alert visible={Boolean(error)} onDismiss={() => setError(null)} timeout={4000}>
        { error }
      </Alert>
      {
        users.map((item) => (
          <ListItem onClick={() => ativateUser(item.token)} key={item.token}>
            <Column>
              <span>{ item.name }</span>
              <small>{ item.city } - { item.state }</small>
              <small>{ item.email }</small>
              <small>{ item.phone }</small>
            </Column>

            <Button>Ativar conta</Button>
          </ListItem>
        ))
      }
    </Container>
  );
};

export default Registers;
