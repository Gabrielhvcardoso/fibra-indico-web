import React, { useMemo } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { Diagram3, Grid, People } from 'react-bootstrap-icons';

import { Container, IconButton, Indicator, Nav } from './styles';

const Toolbar: React.FC<RouteComponentProps> = ({ location }) => {
  const position = useMemo(() => {
    switch (location?.pathname) {
      case '/relationships':
        return 60;
      case '/users':
        return 120;
      default:
        return 0;
    }
  }, [location?.pathname]);

  return (
    <Container>
      <Nav>
        <Indicator position={position} />
        <Link to="/">
          <IconButton>
            <Grid size={25} />
          </IconButton>
        </Link>

        <Link to="/relationships">
          <IconButton>
            <Diagram3 size={25} />
          </IconButton>
        </Link>

        <Link to="/users">
          <IconButton>
            <People size={25} />
          </IconButton>
        </Link>
      </Nav>
    </Container>
  );
};

export default withRouter(Toolbar);
