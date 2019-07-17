const Koa = require('koa');
const ReactSSR = require('react-dom/server');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('koa2-cors');
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
    credentials: true
  })
);
app.use(bodyParser());
app.use(session(config, app));

app.use(serve(path.join(__dirname, '../build')));

for (let i = 0, l = serverRoutes.length; i < l; i++) {
  const item = serverRoutes[i];
  const serverEntry = require(`../build/server-${item.name}`);
  const template = fs.readFileSync(
    path.resolve(__dirname, `../build/${item.name}Server.ejs`),
    'utf-8'
  );
  router.get(item.path, async (ctx, next) => {
    try {
      const currentSite = getCurrentSite(ctx.headers.host);
      const createApp = serverEntry.AppComponent;
      const setPrevState = serverEntry.setPrevState;
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

app.listen(9001, () => {
  console.log('server is listening at port 9001');
});
