import React from 'react';
import { Button, Container, Text } from './styles';

const Item: React.FC = () => {
  return (
    <Container>
      <div>
        <Text>Nome do cliente</Text>
        <Text>R$ 300,00</Text>
        <br />
        <Text style={{ color: '#2b7ed7', cursor: 'pointer' }}>Exibir método de pagamento</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Button>Finalizar</Button>
        <Button>Recusar</Button>
      </div>
    </Container>
  );
};

export default Item;
