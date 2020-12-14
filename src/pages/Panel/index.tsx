import React from 'react';
import { Button, Container, List, ListButtons } from './styles';

const Panel: React.FC = () => {
  return (
    <Container>
      <h1>Painel de controle</h1>

      <List>
        <ListButtons>
          <Button>Pedidos de saque</Button>
          <Button>Recomendações</Button>
        </ListButtons>
      </List>
    </Container>
  );
};

export default Panel;
