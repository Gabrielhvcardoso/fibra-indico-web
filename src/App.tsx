import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import Contexts from './context';

const App: React.FC = () => {
  return (
    <Contexts>
      <Router history={history}>
        <Routes />
      </Router>
    </Contexts>
  );
};

export default App;
