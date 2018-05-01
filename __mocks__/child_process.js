const mockSpawn = require('spawn-mock').mockSpawn;
const child_process = require.requireActual('child_process');

const REACT_APP = /^REACT_APP_/i;

const spawn = mockSpawn(function(cp) {
  // the command (cmd) and the arguments (args) that the returned function
  // has bene called wth
  const { cmd, args } = cp;

  console.log('newSpawn', { cmd, args });
  // end the child process

  child_process.__env__ = Object.keys(process.env)
    .filter(key => REACT_APP.test(key) || key === 'NODE_ENV')
    .reduce((acc, key) => Object.assign(acc, { [key]: process.env[key] }), {});
  cp.end();
});
child_process.spawn = spawn;
module.exports = child_process;
