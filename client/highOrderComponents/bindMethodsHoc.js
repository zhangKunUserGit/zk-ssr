import React, { Component } from 'react';

export default function bindMethodsHoc(...params) {
  // 无参数
  if (params.length === 1 && typeof params[0] !== 'function') {
    return <div>1111</div>;
  }
  const methods = params[0]();
  const copyMethods = { ...methods };
  delete copyMethods.setPrevState;
  return WrappedComponent => {
    return {
      AppComponent: class extends Component {
        constructor(props) {
          super(props);
          if (typeof window.__INITIAL_STATE__ !== 'undefined') {
            this.state = window.__INITIAL_STATE__;
            // 清除
            window.__INITIAL_STATE__ = null;
            const el = document.getElementById('initialState');
            if (el && el.remove) {
              el.remove();
            }
          } else {
            this.state = this.props.prevState || {};
          }
        }
        render() {
          return <WrappedComponent {...this.props} prevState={this.state} {...copyMethods} />;
        }
      },
      setPrevState: methods.setPrevState.bind(null, copyMethods)
    };
  };
}
