import React, { Component } from 'react';
import RenderRoutes from './components/RenderRoutes';

export default class App extends Component {
  render() {
    const { route } = this.props;
    return <RenderRoutes routes={route.routes} visible={true} />;
  }
}
