import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import RenderRoutes from './components/RenderRoutes';
import { routes } from './routes';
import configureStore from './store/index';
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RenderRoutes routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
