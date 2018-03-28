const child_process = require.requireActual('child_process');
const mockSpawn = require('mock-spawn');

const mySpawn = mockSpawn(true);
console.log('mySpawn', mySpawn);
mySpawn.setStrategy(function(command, args, opts) {
  console.error('mySpawn', command);
  return mySpawn.simple(0);
  return null;
});

child_process.spawn = (...args) => {
  debugger;
  mySpawn(args);
};
module.exports = child_process;
