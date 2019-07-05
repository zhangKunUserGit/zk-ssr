import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './Login';
import Home from './Home';

export default () => (
  <React.Fragment>
    <Route path="/" exact render={() => <Redirect to="/home" />} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
  </React.Fragment>
);
