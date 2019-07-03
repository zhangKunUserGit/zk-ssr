import React, { Component } from 'react';
import { observer, inject, propTypes } from 'mobx-react';

@inject(stores => ({
  user: stores.userStore.user,
  login: stores.userStore.login
}))
@observer
class Login extends Component {
  render() {
    return <div>login</div>;
  }
}

Login.propTypes = {
  // login: PropTypes.func,
  user: propTypes.observableObject
};

export default Login;
