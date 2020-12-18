import React from 'react';
import { Container } from './styles';

import Item from './components/Item';

const Withdraws: React.FC = () => {
  return (
    <Container>
      <h2 style={{ marginLeft: 20 }}>Pedidos de saque</h2>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </Container>
  );
};

export default Withdraws;
