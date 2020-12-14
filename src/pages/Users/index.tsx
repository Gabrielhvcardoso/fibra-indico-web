import React from 'react';
import { Button, Container, List, ListButtons } from './styles';

const Users: React.FC = () => {
  return (
    <Container>
      <h1>Gerenciar Usuários</h1>

      <List>
        <ListButtons>
          <Button>Novos</Button>
          <Button>Atuais</Button>
        </ListButtons>
      </List>
    </Container>
  );
};

export default Users;
