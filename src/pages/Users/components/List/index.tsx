import React, { useContext } from 'react';
import { Container, ListItem } from './styles';

import UsersContext from '../../context';

const Users: React.FC = () => {
  const { token, setToken } = useContext(UsersContext);

  const users = [
    { token: 'f6abe778', name: 'Abraão Silva' },
    { token: 'badef5eb', name: 'Adriana Salmon' },
    { token: 'eb78da12', name: 'Angelo Barbosa' },
    { token: '8aff4db6', name: 'Américo Santos Albuquerque Cunha' }
  ];

  return (
    <Container>
      {
        users.map(({ token: userToken, name }) => (
          <ListItem
            selected={token === userToken}
            key={userToken}
            onClick={() => setToken(userToken)}
          >
            { name }
          </ListItem>
        ))
      }
    </Container>
  );
};

export default Users;
