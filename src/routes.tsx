import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Toolbar from './components/Toolbar';

import Panel from './pages/Panel';
import Users from './pages/Users';
import Relationships from './pages/Relationships';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Toolbar />

      <Switch>
        <Route path="/" exact component={Panel} />
        <Route path="/users" component={Users} />
        <Route path="/relationships" component={Relationships} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
