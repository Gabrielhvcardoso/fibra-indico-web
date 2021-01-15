import React, { useContext } from 'react';
import { Container, ListItem } from './styles';

import DataContext from '../../../../context/data';
import UsersContext from '../../context';

const Users: React.FC = () => {
  const { users } = useContext(DataContext);
  const { token, setToken, setIndicatedBy } = useContext(UsersContext);

  const selectUser = (utoken: string, indicatedBy: string | undefined) => {
    setToken(utoken);
    setIndicatedBy(indicatedBy ?? null);
  };

  return (
    <Container>
      {
        users.map(({ token: userToken, name, status, indicatedBy }) => (
          <ListItem
            disabled={!status}
            selected={token === userToken}
            key={userToken}
            onClick={() => selectUser(userToken, indicatedBy)}
          >
            { name }
          </ListItem>
        ))
      }
    </Container>
  );
};

export default Users;
