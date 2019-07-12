const utils = require('./utils');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require('./paths');

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
        sourceMap: true
      }
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true
      }
    });
  }
  return loaders;
};
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        include: [paths.client, paths.server],
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
              emitWarning: true
            },
            loader: require.resolve('eslint-loader')
          }
        ]
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 6144,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/fonts/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|mjs|jsx)$/,
            include: [paths.client, paths.server],
            loader: require.resolve('babel-loader')
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: false
            }),
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
                  sourceMap: true
                }
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true
                }
              }
            ],
            sideEffects: false
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: false,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent
              },
              'sass-loader'
            )
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.ejs$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          { test: /\.ejs$/, loader: 'ejs-compiled-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:12].css'),
      allChunks: true
    })
  ]
};
