import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import HotApp from './src/containers/HotApp';
import { AppState, TopicStore, UserStore } from './src/store';

const initialState = window.__INITIAL_STATE__ || {};

const appState = new AppState(initialState.appState);
const topicStore = new TopicStore(initialState.topicStore);
const userStore = new UserStore(initialState.userStore);
// import App from './src/containers/App';

const renderMethod = !module.hot ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Provider appState={appState} topicStore={topicStore} userStore={userStore}>
    <Router>
      <HotApp />
    </Router>
  </Provider>,
  document.getElementById('root')
);
