const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appRoutes = require('../client/routes');

function getClientEntryAndHtmlWebpackPlugin(isProd) {
  const result = {
    entry: {},
    plugin: []
  };
  appRoutes.forEach(route => {
    if (route.clientUrl) {
      result.entry[route.name] = [
        'babel-polyfill',
        path.join(__dirname, `../client/${route.clientUrl}.js`)
      ];
      if (isProd) {
        result.plugin.push(
          new HtmlWebpackPlugin({
            inject: true,
            chunks: [route.name, 'vendor'],
            filename: `${route.name}Server.ejs`,
            template: path.join(__dirname, '../client/server.template.ejs'),
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          })
        );
      } else {
        result.plugin.push(
          new HtmlWebpackPlugin({
            inject: true,
            chunks: [route.name],
            filename: `${route.name}Server.ejs`,
            template: path.join(__dirname, '../client/server.template.ejs')
          })
        );
      }
    }
  });
  return result;
}

function getServerEntry() {
  const result = {
    entry: {},
    plugin: []
  };
  appRoutes.forEach(route => {
    if (route.clientUrl) {
      result.entry[route.name] = path.join(__dirname, `../client/${route.serverUrl}.js`);
    }
  });
  return result;
}

module.exports = {
  getClientEntryAndHtmlWebpackPlugin: getClientEntryAndHtmlWebpackPlugin,
  getServerEntry: getServerEntry
};
