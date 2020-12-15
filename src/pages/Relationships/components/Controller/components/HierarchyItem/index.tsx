import React from 'react';
import { Button, Container, Text } from './styles';

const HierarchyItem: React.FC = () => {
  return (
    <Container>
      <Text>Profundidade: 1</Text>
      <Text>Porcentagem: 10%</Text>
      <Button>Editar</Button>
    </Container>
  );
};

export default HierarchyItem;
