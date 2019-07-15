import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

// 公共部分，在Node环境中无window document navigator 等对象
if (typeof window === 'undefined') {
  global.window = {};
  global.document = {};
}

export default function bindMethodsHoc(...params) {
  // 无参数
  if (params.length === 1 && typeof params[0] !== 'function') {
    return <div>1111</div>;
  }
  const methods = params[0]();
  const styleList = params[1];
  const copyMethods = { ...methods };
  delete copyMethods.setPrevState;
  return WrappedComponent => {
    class App extends Component {
      constructor(props) {
        super(props);
        if (typeof window.__INITIAL_STATE__ !== 'undefined') {
          this.state = window.__INITIAL_STATE__;
          // 清除
          window.__INITIAL_STATE__ = null;
          const initialStateEl = document.getElementById('initialState');
          const initialStyleEl = document.getElementById('initialStyle');
          if (initialStateEl && initialStateEl.remove) {
            initialStateEl.remove();
          }
          if (initialStyleEl && initialStyleEl.remove) {
            initialStyleEl.remove();
          }
        } else {
          this.state = this.props.prevState || {};
        }
      }
      render() {
        return <WrappedComponent {...this.props} prevState={this.state} {...copyMethods} />;
      }
    }
    return {
      AppComponent: styleList ? withStyles(styleList)(App) : App,
      setPrevState: methods.setPrevState.bind(null, copyMethods)
    };
  };
}
