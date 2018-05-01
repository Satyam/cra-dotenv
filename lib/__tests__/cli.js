// jest.mock('fs');
jest.mock('child_process');
jest.mock('process');
const child_process = require('child_process');

const path = require('path');
// const execSync = require('child_process').execSync;

const dotEnvBin = path.resolve(process.cwd(), './bin/cra-dotenv.js');

const cli = require('../cli');

// describe('basic options', () => {
//   it('help', () => {
//     debugger;
//     cli(['node', dotEnvBin, '-h'], {});
//     // expect(x('-h')).toMatchSnapshot();
//   });
//   it('version', () => {
//     debugger;
//     cli([dotEnvBin, '-V'], {});
//     //expect(x('-V')).toMatchSnapshot();
//   });
// });

describe('no NODE_ENV', () => {
  it('should run', done => {
    cli(['node', dotEnvBin, 'listEnv'], {});
    process.nextTick(() => {
      console.log('ended with ', child_process.__env__);
      done();
    });
  });
  // it('with developent flag', () => {
  //   cli(['node', dotEnvBin, 'listEnv', '-d'], {});
  //   process.nextTick(() => {
  //     console.log('ended with ', child_process.__env__);
  //     done();
  //   });
  // });
});
