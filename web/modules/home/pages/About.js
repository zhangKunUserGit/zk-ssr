import React from 'react';
import bindMethod from '../../../highOrderComponents/bindMethod';
import '../styles/base.scss';
import '../styles/test.scss';
import '../styles/home.scss';

@bindMethod(() => {
  return {
    async setPrevState(self) {
      const info = await self.getMyName();
      return {
        SEO: {
          title: 'my title',
          description: 'description,description'
        },
        info
      };
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
