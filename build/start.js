process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const configFactory = require('./webpack.dev.conf');
const chalk = require('react-dev-utils/chalk');
const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const createDevServerConfig = require('./webpackDevServer.config');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = 'testAPP';
const urls = prepareUrls(protocol, '0.0.0.0', 8080);
const devSocket = {
  warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
  errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
};
const compiler = createCompiler({
  appName,
  config: configFactory,
  devSocket,
  urls,
  webpack
});
const serverConfig = createDevServerConfig();
const devServer = new WebpackDevServer(compiler, serverConfig);
devServer.listen(8080, '0.0.0.0', err => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.cyan('Starting the development server...\n'));
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
