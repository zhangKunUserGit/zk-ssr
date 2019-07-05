import React from 'react';

let count = 1;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: 'zhangkun346'
    };
  }
  onChangeName() {
    console.log('aaaa');
    this.setState({
      myName: `zhangkun2233434`
    });
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.onChangeName.bind(this)}>btnbtn </button>
        Home page1111 {JSON.stringify(this.props)}789 {this.state.myName}
      </div>
    );
  }
}
