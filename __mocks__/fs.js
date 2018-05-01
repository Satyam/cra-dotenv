const path = require('path');
debugger;
const fs = require.requireActual('fs');

function readFileSync(path, options) {
  console.log('readFileSync', path);
  return '';
}
function existsSync(path) {
  console.log('existsSync', path);
  return false;
}

fs.readFileSync = readFileSync;
fs.existsSync = existsSync;

module.exports = fs;
