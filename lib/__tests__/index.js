// jest.mock('fs');
jest.mock('child_process');

const path = require('path');
// const execSync = require('child_process').execSync;

console.log('cwd', process.cwd());
const dotEnvBin = path.resolve(process.cwd(), './bin/cra-dotenv.js');
const listEnv = path.resolve(
  process.cwd(),
  './lib/__utils__/__utils__/listEnv'
);
console.log('dotEnvBin', dotEnvBin, listEnv);
const cli = require('../cli');

describe('basic options', () => {
  // it('help', () => {
  //   debugger;
  //   cli(['node', dotEnvBin, '-h'], {});
  //   // expect(x('-h')).toMatchSnapshot();
  // });
  // it('version', () => {
  //   debugger;
  //   cli([dotEnvBin, '-V'], {});
  //   //expect(x('-V')).toMatchSnapshot();
  // });
});

describe('no NODE_ENV', () => {
  it('should run', () => {
    cli(['node', dotEnvBin, listEnv], {});
  });
  // it('with developent flag', () => {
  //   cli(['node', dotEnvBin, listEnv, '-d'], {});
  // });
});
