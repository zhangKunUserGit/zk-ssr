import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HotApp from './HotApp';

const renderMethod = !module.hot ? ReactDOM.hydrate : ReactDOM.render;

renderMethod(
  <Router>
    <HotApp />
  </Router>,
  document.getElementById('root')
);
