import React from 'react';
import bindMethodsHoc from './highOrderComponents/bindMethodsHoc';

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
})
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }
  onChangeName() {
    // this.setState({
    //   myName: `zhangkun ${count++}`
    // });
  }
  render() {
    return (
      <div>
        <button onClick={this.onChangeName.bind(this)}>btnbtn</button>1111
      </div>
    );
  }
}
