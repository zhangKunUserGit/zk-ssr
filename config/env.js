const getAppConfig = require('./app.config');

const appConfig = getAppConfig();

const REACT_APP = /^REACT_APP_/i;

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
          NODE_ENV: process.env.NODE_ENV || 'production',
          PUBLIC_URL: publicUrl
        },
        appConfig
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
