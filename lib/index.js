const fs = require('fs');
const path = require('path');
debugger;
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const { NODE_ENV } = process.env;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const baseEnv = resolveApp('.env');

const REACT_APP = /^REACT_APP_/i;

function pickReactApp() {
  const dotenvFiles = [
    NODE_ENV && `${baseEnv}.${NODE_ENV}.local`,
    NODE_ENV && `${baseEnv}.${NODE_ENV}`,
    NODE_ENV !== 'test' && `${baseEnv}.local`,
    baseEnv,
  ].filter(Boolean);

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      dotenvExpand(
        dotenv.config({
          path: dotenvFile,
        }),
      );
    }
  });
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
