require('babel-polyfill');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./utils');
const appEnv = require('./env');
const env = appEnv.getWebEnvironment('/');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const routes = require('./routes');
const webEntryAndHtmlWebpackPlugin = routes.getWebEntryAndHtmlWebpackPlugin();

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('isomorphic-style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            flexbox: 'no-2009'
          })
        ],
        sourceMap: false
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: false
      }
    });
  }
  return loaders;
};

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  entry: webEntryAndHtmlWebpackPlugin.entry,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/public/'
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
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: require.resolve('css-loader')
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                      flexbox: 'no-2009'
                    })
                  ],
                  sourceMap: false
                }
              }
            ],
            sideEffects: false
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent
            })
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: require.resolve('css-loader')
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                      flexbox: 'no-2009'
                    })
                  ],
                  sourceMap: false
                }
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: false
                }
              }
            ],
            sideEffects: false
          }
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:12].css'),
      allChunks: true
    }),
    ...webEntryAndHtmlWebpackPlugin.plugin
  ]
});
