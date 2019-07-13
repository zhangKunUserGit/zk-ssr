require('babel-polyfill');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const appEnv = require('./env');
const env = appEnv.getClientEnvironment('/');

module.exports = merge(baseWebpackConfig, {
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
  plugins: [
    new webpack.DefinePlugin(env.stringified),
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
