import { observable } from 'mobx';

export default class User {
  @observable user = {
    isLogin: false,
    info: {}
  };

  toJson() {
    return {
      user: this.user
    };
  }
}
