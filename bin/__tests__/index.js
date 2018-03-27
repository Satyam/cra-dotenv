'use strict';
const path = require('path');
const execSync = require('child_process').execSync;

jest.mock('fs');
jest.mock('child_process');

const bin = path.resolve(process.cwd(), 'bin/cra-dotenv.js');

function x(extra) {
  return execSync(`${bin} ${extra || ''}`, { encoding: 'utf8' });
}
describe('basic options', () => {
  it('help', () => {
    expect(x('-h')).toMatchSnapshot();
  });
  it('version', () => {
    expect(x('-V')).toMatchSnapshot();
  });
});
describe('no NODE_ENV', () => {
  it('should run', () => {
    console.log(x('a b c'));
  });
});
