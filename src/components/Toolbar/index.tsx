import React, { useMemo } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import {
  Diagram3,
  Diagram3Fill,
  Grid,
  GridFill,
  People,
  PeopleFill
} from 'react-bootstrap-icons';

import { Container, IconButton, Indicator, Nav } from './styles';

const Toolbar: React.FC<RouteComponentProps> = ({ location }) => {
  const position = useMemo(() => {
    switch (location?.pathname) {
      case '/relationships':
        return 1;
      case '/users':
        return 2;
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
            {
              location.pathname === '/'
                ? <GridFill size={25} />
                : <Grid size={25} />
            }
          </IconButton>
        </Link>

        <Link to="/relationships">
          <IconButton>
            {
              location.pathname === '/relationships'
                ? <Diagram3Fill size={25} />
                : <Diagram3 size={25} />
            }
          </IconButton>
        </Link>

        <Link to="/users">
          <IconButton>
            {
              location.pathname === '/users'
                ? <PeopleFill size={25} />
                : <People size={25} />
            }
          </IconButton>
        </Link>
      </Nav>
    </Container>
  );
};

export default withRouter(Toolbar);
