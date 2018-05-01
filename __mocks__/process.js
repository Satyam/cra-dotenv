const process = require.requireActual('process');

console.log('mocking process');
process.exit = code => {
  console.log('exit with code: ', code);
  return;
};

process.reallyExit = code => {
  console.log('reallyExit with code: ', code);
  return;
};

module.exports = process;
