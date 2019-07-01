import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import lazy from './utils/lazy';
const routes = require('./routes');

const Routes = () => {
  return (
    <React.Fragment>
      {routes.map(route => {
        return <Route path={route.path} component={lazy(route.url)} />;
      })}
    </React.Fragment>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>header</div>
        <Routes />
      </div>
    );
  }
}
