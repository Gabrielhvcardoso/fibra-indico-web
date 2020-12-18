import React from 'react';
import { Container } from './styles';

import Recommendations from './Recommendations';
import Withdraws from './Withdraws';

const Panel: React.FC = () => {
  return (
    <Container>
      <Withdraws />
      <Recommendations />
    </Container>
  );
};

export default Panel;
