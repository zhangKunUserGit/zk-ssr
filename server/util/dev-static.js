const axios = require('axios');
const bootstrapper = require('./asyncBootstrapper');
const ReactSSR = require('react-dom/server');
const Helmet = require('react-helmet').default;
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const path = require('path');
const proxy = require('koa-proxies');
// const bootstrapper = require('react-async-bootstrapper');
const serverConfig = require('../../build/webpack.server.conf');

// 获取模板文件
const getTemplate = file => {
  return axios
    .get('http://0.0.0.0:8080/public/' + file + '.ejs')
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
};

const NativeModule = require('module');
const vm = require('vm');

// 将string解析为一个模块
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };
  // 模块包装器
  // 在执行模块代码之前，Node.js 会使用一个如下的函数包装器将其包装：
  // (function (exports, require, module, __filename, __dirname) {
  //   // 模块的代码实际上在这里, bundle code
  // });
  const wrapper = NativeModule.wrap(bundle);
  // vm.Script类型的实例包含若干预编译的脚本，这些脚本能够在特定的沙箱（或者上下文）中被运行。
  // 创建一个新的vm.Script对象只编译代码但不会执行它。编译过的vm.Script此后可以被多次执行
  const script = new vm.Script(wrapper, {
    filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
};

// 将string转为模块使用
// const Module = module.constructor;

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
// 自定义文件系统
// 默认情况下，webpack 使用普通文件系统来读取文件并将文件写入磁盘。
// 但是，还可以使用不同类型的文件系统（内存(memory), webDAV 等）来更改输入或输出行为。
// 为了实现这一点，可以改变 inputFileSystem 或 outputFileSystem。
// 例如，可以使用 memory-fs 替换默认的 outputFileSystem，以将文件写入到内存中，而不是写入到磁盘。
serverCompiler.outputFileSystem = mfs;

// 调用 watch 方法会触发 webpack 执行器，但之后会监听变更（很像 CLI 命令: webpack--watch）
// 一旦 webpack 检测到文件变更，就会重新执行编译。该方法返回一个 Watching 实例。
// let serverBundleApp;
// let serverBundleLogin;
let serverBundleHome;
// let createStoreMap;
serverCompiler.watch({}, (err, stats, next) => {
  // 可以通过stats获取到代码编译过程中的有用信息，包括：
  // 1. 错误和警告（如果有的话）
  // 2. 计时信息
  // 3. module 和 chunk 信息
  if (err) throw err;
  console.log('aaaa');
  try {
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('错误');
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.log('警告');
      console.warn(info.warnings);
    }

    const bundlePath = path.join(serverConfig.output.path, 'server-home.js');
    // 从内存中读取server bundle
    // 读出的bundle是为string类型，并不是js中可以使用的模块
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const mHome = getModuleFromString(bundle, 'server-home.js');
    serverBundleHome = mHome.exports;
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = (app, router) => {
  // 代理转发
  app.use(
    proxy('/public', {
      target: 'http://0.0.0.0:8080',
      ws: false
    })
  );
  router.get('/home', async (ctx, next) => {
    const template = await getTemplate('serverHome');
    if (!serverBundleHome) {
      ctx.body = 'waiting for compile';
      return;
    }
    try {
      const css = new Set();

      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      const insertCss = (...styles) => {
        console.log(styles, 'styles');
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      };
      const createApp = serverBundleHome.AppComponent;
      const setPrevState = serverBundleHome.setPrevState;
      const info = await setPrevState();
      const appTemplate = createApp(info, insertCss);
      const appString = ReactSSR.renderToString(appTemplate);
      const helmet = Helmet.renderStatic();
      console.log([...css].join(''), 'ccc');
      ctx.body = ejs.render(template, {
        initialState: serialize(info),
        appString,
        title: helmet.title.toString(),
        meta: helmet.meta.toString(),
        style: [...css].join('')
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
};
