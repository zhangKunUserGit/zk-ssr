const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const Helmet = require('react-helmet').default;
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('koa2-cors');
const handleResponse = require('./middlewares/handle-response');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('koa-proxies');
const serverConfig = require('../build/webpack.server.conf');
const serverRoutes = require('./routes/index');

const app = new Koa();
app.keys = ['koa ssr demo'];

const router = new Router();
const config = {
  key: 'koa:ssr',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
};

app.use(handleResponse);
app.use(
  cors({
    credentials: true // request 的 credentials属性表示是否允许其他域发送cookie
  })
);
app.use(bodyParser());
app.use(session(config, app));

// 代理转发
app.use(
  proxy('/public', {
    target: 'http://0.0.0.0:8080',
    ws: false
  })
);
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

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} };

  const wrapper = NativeModule.wrap(bundle);

  const script = new vm.Script(wrapper, {
    filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
};

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);

serverCompiler.outputFileSystem = mfs;

serverCompiler.watch({}, (err, stats, next) => {
  if (err) throw err;
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
  } catch (e) {
    console.log(e);
    next();
  }
});
for (let i = 0; i < serverRoutes.length; i++) {
  const item = serverRoutes[i];
  router.get(item.path, async (ctx, next) => {
    console.log(process.env);
    const template = await getTemplate(`${item.name}Server`);
    const bundlePath = path.join(serverConfig.output.path, `server-${item.name}.js`);
    // 从内存中读取server bundle
    // 读出的bundle是为string类型，并不是js中可以使用的模块
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const mHome = getModuleFromString(bundle, `server-${item.name}.js`);
    const serverBundleHome = mHome.exports;
    if (!serverBundleHome) {
      ctx.body = 'waiting for compile';
      return;
    }
    try {
      const css = new Set();
      const insertCss = (...styles) => {
        styles.forEach(style => css.add(style._getCss()));
      };
      const createApp = serverBundleHome.AppComponent;
      const setPrevState = serverBundleHome.setPrevState;
      const info = await setPrevState();
      const appTemplate = createApp(info, insertCss);
      const appString = ReactSSR.renderToString(appTemplate);
      const helmet = Helmet.renderStatic();
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
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(7000, () => {
  console.log('server is listening at port 6666');
});
