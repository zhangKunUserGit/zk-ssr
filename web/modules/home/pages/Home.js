import React from 'react';
import bindMethod from '../../../highOrderComponents/bindMethod';
import '../styles/base.scss';
import '../styles/home.scss';

@bindMethod(() => {
  return {
    async setPrevState(self, params) {
      const info = await self.getMyName();
      return info;
    },
    async getMyName() {
      const info = await { myName: 'zhangkun' };
      return info;
    }
  };
})
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: props.prevState.myName
    };
  }
  onChangeName = () => {
    console.log('onChange home');
    this.setState(
      {
        myName: '111'
      },
      () => {
        window.location.href = '/about';
      }
    );
  };
  render() {
    return (
      <div>
        <button onClick={this.onChangeName} className="btn">
          btnbtn {this.state.myName}
          {process.env.ApiServiceUrl}
          {process.env.CURRENT_SITE}
        </button>
        1111 <span className="text">33e</span>
        <span className="text-gray">home111333</span>
      </div>
    );
  }
}
