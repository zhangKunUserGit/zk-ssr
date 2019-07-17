const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('koa2-cors');
const axios = require('axios');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('koa-proxies');
const serverConfig = require('../config/webpack.server.conf');
const serverRoutes = require('./routes/index');
const { getCookie } = require('./utils/get');
const { getCurrentSite } = require('./utils/site');
const { getSiteInfo } = require('./constants/sites');

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
for (let i = 0, l = serverRoutes.length; i < l; i++) {
  const item = serverRoutes[i];
  router.get(item.path, async (ctx, next) => {
    let template, serverBundle;
    try {
      template = await getTemplate(`${item.name}Server`);
      const bundlePath = path.join(serverConfig.output.path, `server-${item.name}.js`);
      // 从内存中读取server bundle
      // 读出的bundle是为string类型，并不是js中可以使用的模块
      const bundle = mfs.readFileSync(bundlePath, 'utf-8');
      const app = getModuleFromString(bundle, `server-${item.name}.js`);
      serverBundle = app.exports;
    } catch (e) {}
    if (!serverBundle) {
      ctx.body = 'waiting for compile, please refresh again.';
      return;
    }
    try {
      const currentSite = getCurrentSite(ctx.headers.host);
      const createApp = serverBundle.AppComponent;
      const setPrevState = serverBundle.setPrevState;
      const info = await setPrevState({
        site: currentSite,
        siteInfo: getSiteInfo(currentSite),
        cookie: getCookie(ctx.headers.cookie)
      });
      const appTemplate = createApp(info);
      const appString = ReactSSR.renderToString(appTemplate);
      const seo = info.SEO || {};
      ctx.body = ejs.render(template, {
        initialState: serialize(info),
        appString,
        title: seo.title ? `<title>${seo.title}</title>` : '',
        meta: seo.description ? `<meta name="description" content="${seo.description}">` : ''
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9090, () => {
  console.log('server is listening at port 9090');
});
