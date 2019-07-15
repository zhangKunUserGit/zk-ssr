const getAppConfig = require('./app.config');
const sites = require('./sites');

const appConfig = getAppConfig();

const REACT_APP = /^REACT_APP_/i;

function getLocalSiteName() {
  const siteConfig = {};
  if (process.env.NODE_ENV === 'development') {
    const currentSite = process.argv[process.argv.length - 1];
    for (let i = 0, l = sites.length; i < l; i++) {
      if (currentSite.toUpperCase() === sites[i]) {
        siteConfig.CURRENT_SITE = sites[i];
        break;
      }
    }
    if (!siteConfig.CURRENT_SITE) {
      // 默认是HPN
      siteConfig.CURRENT_SITE = sites[1];
    }
  }
  return siteConfig;
}

function getWebEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      Object.assign(
        {
          NODE_ENV: process.env.NODE_ENV || 'development',
          PUBLIC_URL: publicUrl
        },
        appConfig,
        getLocalSiteName()
      )
    );

  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };

  return { raw, stringified };
}

module.exports = {
  getWebEnvironment: getWebEnvironment
};
