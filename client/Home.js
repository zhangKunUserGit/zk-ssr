import React from 'react';
import bindMethodsHoc from './highOrderComponents/bindMethodsHoc';
import './base.scss';
import s from './home.module.scss';
import { Helmet } from 'react-helmet';

// 公共部分，在Node环境中无window document navigator 等对象
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {};
}

@bindMethodsHoc(() => {
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
}, s)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: props.prevState.myName
    };
  }
  onChangeName = () => {
    console.log('onChangeName');
    this.setState({
      myName: '111'
    });
  };
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>
        <button onClick={this.onChangeName}>btnbtn {this.state.myName}</button>
        1111 <span className="text">tddfasdfdsest</span>
        <span className="text-gray">444</span>
      </div>
    );
  }
}
