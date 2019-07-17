const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const utils = require('./utils');
const appEnv = require('./env');
const env = appEnv.getWebEnvironment('/');
const routes = require('./routes');
const serverEntry = routes.getServerEntry();

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const serverWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  target: 'node',
  entry: serverEntry.entry,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server-[name].js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/public/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [
              {
                loader: require.resolve('ignore-loader')
              }
            ],
            sideEffects: false
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('ignore-loader')
              }
            ],
            sideEffects: false
          }
        ]
      }
    ]
  },
  plugins: [new webpack.DefinePlugin(env.stringified)],
  // 去除依赖，不打包到生成的文件中
  // 打包出来的代码是运行在node环境中的，这些类库是可以通过require()方式调用的
  externals: Object.keys(require('../package.json').dependencies),
  devtool: 'cheap-module-eval-source-map'
});

module.exports = serverWebpackConfig;
