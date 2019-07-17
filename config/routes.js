const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appRoutes = require('../server/routes/index');

function getWebEntryAndHtmlWebpackPlugin(isProd) {
  const result = {
    entry: {},
    plugin: []
  };
  appRoutes.forEach(route => {
    if (route.webUrl) {
      result.entry[route.name] = [
        'babel-polyfill',
        path.join(__dirname, `../web/${route.webUrl}.js`)
      ];
      if (isProd) {
        result.plugin.push(
          new HtmlWebpackPlugin({
            inject: true,
            chunks: [route.name, 'vendor', 'main'],
            filename: `${route.name}Server.ejs`,
            template: path.join(__dirname, '../web/server.template.ejs'),
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
            template: path.join(__dirname, '../web/server.template.ejs')
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
    if (route.webUrl) {
      result.entry[route.name] = path.join(__dirname, `../web/${route.serverUrl}.js`);
    }
  });
  return result;
}

module.exports = {
  getWebEntryAndHtmlWebpackPlugin: getWebEntryAndHtmlWebpackPlugin,
  getServerEntry: getServerEntry
};
