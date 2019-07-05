const Koa = require('koa');
const bootstrapper = require('react-async-bootstrapper');
const ReactSSR = require('react-dom/server');
const Helmet = require('react-helmet').default;
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('koa2-cors');
const handleResponse = require('./middlewares/handle-response');
const serverRender = require('./util/server-render');

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

if (process.env.NODE_ENV === 'development') {
  const devStatic = require('./util/dev-static');
  devStatic(app, router);
} else {
  const serverEntry = require('../dist/server-home');
  const template = fs.readFileSync(path.resolve(__dirname, '../dist/serverHome.ejs'), 'utf-8');
  app.use(serve(path.join(__dirname, '../dist')));
  router.get('/home', async (ctx, next) => {
    const createApp = serverEntry.default;
    const appTemplate = createApp({ name: 'aaa' });
    await bootstrapper(appTemplate)
      .then(() => {
        const appString = ReactSSR.renderToString(appTemplate);
        console.log(appString, 'appString');
        const helmet = Helmet.renderStatic();
        const html = ejs.render(template, {
          initialState: serialize({ age: '20' }),
          appString,
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          link: helmet.link.toString(),
          style: helmet.style.toString()
        });
        ctx.body = html;
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  });
  // router.get('*', async (ctx, next) => {
  //   // const appString = ReactSSR.renderToString(serverEntry.default);
  //   // ctx.body = template.replace('<!-- app -->', appString);
  //   await serverRender(ctx, next, serverEntry, template);
  // });
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9000, () => {
  console.log('server is listening at port 9000');
});
