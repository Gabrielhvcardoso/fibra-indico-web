import React from 'react';
import { Container } from './styles';

import Controller from './components/Controller';
import Visualization from './components/Visualization';

const RelationsShips: React.FC = () => {
  return (
    <Container>
      <Controller />
      <Visualization />
    </Container>
  );
};

export default RelationsShips;
