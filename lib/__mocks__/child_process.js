const child_process = require.requireActual('child_process');
const mockSpawn = require('mock-spawn');

const mySpawn = mockSpawn(true);

mySpawn.setStrategy(function(command, args, opts) {
  console.log('mySpawn', command, args, opts);
  return mySpawn.simple(0);
});

child_process.spawn = mySpawn;

module.exports = child_process;
