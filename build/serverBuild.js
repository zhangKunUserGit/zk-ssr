require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.server.conf');

const spinner = ora('building server for production...');
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  );

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build server failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build server complete.\n'));
  console.log(
    chalk.yellow(
      '  Tip: built files all successfully.\n' +
        '    You can run the corresponding commands \n' +
        "    'npm run server:xxx(Operating environment)' open the project. \n"
    )
  );
});
