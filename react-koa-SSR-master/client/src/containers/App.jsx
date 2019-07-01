import React, { Component } from 'react';
import Routes from '../router';
import TopBar from './top-bar';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <React.Fragment>
        <div>111111</div>
        <TopBar />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
