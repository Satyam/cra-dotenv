const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const NODE_ENV = process.env.NODE_ENV;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const baseEnv = resolveApp('.env');

const dotenvFiles = [
  NODE_ENV && `${baseEnv}.${NODE_ENV}.local`,
  NODE_ENV && `${baseEnv}.${NODE_ENV}`,
  NODE_ENV !== 'test' && `${baseEnv}.local`,
  baseEnv,
].filter(Boolean);

const env = dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      }),
    );
  }
});

const REACT_APP = /^REACT_APP_/i;

function pickReactApp() {
  return Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
}

function webpackDefine(publicUrl) {
  const raw = Object.assign(pickReactApp(), {
    NODE_ENV,
    PUBLIC_URL: publicUrl,
  });

  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = {
  webpackDefine,
  pickReactApp,
};
