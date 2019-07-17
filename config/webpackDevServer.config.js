const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

module.exports = function() {
  return {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    open: false,
    overlay: false,
    publicPath: '/public/',
    proxy: {},
    quiet: true,
    watchOptions: {
      poll: 1000
    },
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
    }
  };
};
