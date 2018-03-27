'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs');

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
