import React, { useContext } from 'react';
import { Container, ListItem } from './styles';

import DataContext from '../../../../context/data';
import UsersContext from '../../context';

const Users: React.FC = () => {
  const { users } = useContext(DataContext);
  const { token, setToken } = useContext(UsersContext);

  return (
    <Container>
      {
        users.map(({ token: userToken, name, status }) => (
          <ListItem
            disabled={!status}
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
