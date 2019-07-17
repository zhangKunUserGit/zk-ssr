module.exports = [
  {
    name: 'home',
    path: '/home',
    webUrl: 'modules/home/render/renderHome',
    serverUrl: 'modules/home/servers/serverHome'
  },
  {
    name: 'about',
    path: '/about',
    webUrl: 'modules/home/render/renderAbout',
    serverUrl: 'modules/home/servers/serverAbout'
  },
  {
    name: 'shoppingCart',
    path: '/shopping/cart',
    webUrl: 'modules/home/render/renderShoppingCart',
    serverUrl: 'modules/home/servers/serverShoppingCart'
  }
];
