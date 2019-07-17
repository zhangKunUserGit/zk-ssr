import React from 'react';
import bindMethod from '../../../highOrderComponents/bindMethod';
import '../styles/base.scss';
import '../styles/test.scss';
import '../styles/home.scss';
import { Helmet } from 'react-helmet';

@bindMethod(() => {
  return {
    async setPrevState(self) {
      const info = await self.getMyName();
      return info;
    },
    async getMyName() {
      const info = await { myName: 'zhangkun' };
      return info;
    }
  };
})
export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: props.prevState.myName
    };
  }
  onChangeName = () => {
    console.log('onChange  about');
    this.setState(
      {
        myName: '111'
      },
      () => {
        window.location.href = '/home';
      }
    );
  };
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Tit111le</title>
        </Helmet>
        <button onClick={this.onChangeName} className="btn">
          btnbtn {this.state.myName}
          {process.env.ApiServiceUrl}
        </button>
        1111 <span className="text">33e</span>
        <span className="text-gray">about</span>
      </div>
    );
  }
}
