'use strict';
jest.mock('fs');
jest.mock('child_process');

const path = require('path');
const execSync = require('child_process').execSync;

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
debugger;
describe('no NODE_ENV', () => {
  it('should run', () => {
    expect(() => {
      console.log(x('a b c'));
    }).toThrow();
  });
});
