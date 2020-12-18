import React from 'react';
import { Button, Container, Text } from './styles';

const Item: React.FC = () => {
  return (
    <Container>
      <div>
        <Text>Código - Nome do produto</Text>
        <Text>Nome do cliente</Text>
        <Text>Telefone principal</Text>
        <Text>Outro telefone</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Button>Finalizar</Button>
        <Button>Recusar</Button>
      </div>
    </Container>
  );
};

export default Item;
