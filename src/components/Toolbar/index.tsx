import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Container, Nav, NavLink } from './styles';

const Toolbar: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Container>
      <Nav>
        {
          [
            { to: '/', label: 'Painel de controle' },
            { to: '/relationships', label: 'Relacionamentos' },
            { to: '/users', label: 'Usuários' }
          ].map(({ to, label }) => (
            <NavLink key={to} selected={location.pathname === to} to={to}>{ label }</NavLink>
          ))
        }
      </Nav>
    </Container>
  );
};

export default withRouter(Toolbar);
