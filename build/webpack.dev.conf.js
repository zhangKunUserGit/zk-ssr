require('babel-polyfill');
const portfinder = require('portfinder');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: {
    home: ['babel-polyfill', path.join(__dirname, '../client/hydrateHome.js')]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/public/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
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
      poll: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['home'],
      filename: 'serverHome.ejs',
      template: path.join(__dirname, '../client/server.template.ejs')
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8080;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
            ]
          },
          onErrors: utils.createNotifierCallback()
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
