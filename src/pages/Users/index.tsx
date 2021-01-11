import React from 'react';
import { Container } from './styles';

import List from './components/List';
import Visualization from './components/Visualization';

import { UsersContextProvider } from './context';
import Details from './components/Details';

const Users: React.FC = () => {
  return (
    <UsersContextProvider>
      <Container>
        <List />
        <Visualization />
        <Details />
      </Container>
    </UsersContextProvider>
  );
};

export default Users;
