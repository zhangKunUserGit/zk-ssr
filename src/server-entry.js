import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import App from './App';

console.log(StaticRouter);

const router = (store, routerContext, url) => (
  <Provider store={store}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
);

export { configureStore, router };
