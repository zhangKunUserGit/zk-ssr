const path = require('path');
const paths = require('./paths');

const serverWebpackConfig = {
  mode: 'development',
  target: 'node',
  entry: {
    app: path.join(__dirname, '../src/server-entry.js')
  },
  output: {
    path: paths.appBuild,
    // filename: utils.assetsPath('js/server-entry.js'),
    filename: 'server-entry.js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/public/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
        // include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      { test: /\.ejs$/, loader: 'ejs-compiled-loader' }
    ]
  },
  // 去除依赖，不打包到生成的文件中
  // 打包出来的代码是运行在node环境中的，这些类库是可以通过require()方式调用的
  externals: Object.keys(require('../package.json').dependencies),
  // module: {
  //   rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  // },
  devtool: 'cheap-module-eval-source-map'
};

module.exports = serverWebpackConfig;
