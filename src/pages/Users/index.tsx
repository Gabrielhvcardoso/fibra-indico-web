import React from 'react';
import { Container } from './styles';

import List from './components/List';
import Visualization from './components/Visualization';

const Users: React.FC = () => {
  return (
    <Container>
      <List />
      <Visualization />
    </Container>
  );
};

export default Users;
