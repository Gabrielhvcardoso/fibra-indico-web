import React from 'react';
import { Container, IconButton } from './styles';

import { Diagram3, Grid, People } from 'react-bootstrap-icons';

const Toolbar: React.FC = () => {
  return (
    <Container>
      <IconButton>
        <Grid size={25} />
      </IconButton>

      <IconButton>
        <Diagram3 size={25} />
      </IconButton>

      <IconButton>
        <People size={25} />
      </IconButton>
    </Container>
  );
};

export default Toolbar;
