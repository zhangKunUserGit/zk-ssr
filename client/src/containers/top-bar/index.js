import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    // 登录跳转
    this.props.history.replace('/login');
  }

  render() {
    return (
      <div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}
