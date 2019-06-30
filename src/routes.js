import App from './App.js';
import homeRoutes from './modules/home/routes';
import aboutRoutes from './modules/about/routes';

const routesConfig = [...homeRoutes, ...aboutRoutes];

export const routes = [
  {
    component: App,
    path: '/',
    routes: [...routesConfig]
  }
];
