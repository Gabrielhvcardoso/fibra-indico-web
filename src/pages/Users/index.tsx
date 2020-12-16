import React from 'react';
import { Container } from './styles';

import List from './components/List';
import Visualization from './components/Visualization';

import { UsersContextProvider } from './context';

const Users: React.FC = () => {
  return (
    <UsersContextProvider>
      <Container>
        <List />
        <Visualization />
      </Container>
    </UsersContextProvider>
  );
};

export default Users;
