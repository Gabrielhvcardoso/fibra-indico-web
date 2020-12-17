import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Toolbar from './components/Toolbar';

import Auth from './auth';

import Panel from './pages/Panel';
import Users from './pages/Users';
import Products from './pages/Products';

import AuthContext from './context/auth';

const Routes: React.FC = () => {
  const { secret } = useContext(AuthContext);

  return (
    <BrowserRouter>
      { secret && <Toolbar /> }

      <Switch>
        {
          secret
            ? (
                <>
                  <Route path="/" exact component={Panel} />
                  <Route path="/users" component={Users} />
                  <Route path="/products" component={Products} />
                </>
              )
            : <Route path="/" exact component={Auth} />
        }
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
