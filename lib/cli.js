const spawn = require('cross-spawn').spawn;
// const spawn = require('child_process').spawn;
const program = require('commander');

function cli(argv, env) {
  program
    .version('0.0.1')
    .description(
      'Runs a cli application using a set of .env files following the rules of create-react-app.'
    )
    .arguments('<command> [commandOptions...]')
    .option('-d, --development', 'sets NODE_ENV=development')
    .option('-p, --production', 'sets NODE_ENV=production')
    .option('-t, --test', 'sets NODE_ENV=test')
    .on('--help', function() {
      console.log(`
The -d, -p and -t options are mutually exclusive.
If none is given, the current value of NODE_ENV will be used.

For example, for "production", the utility will try to locate
the following files and merge the variables in them, in the following
order of priority:

1- .env.production.local
2- .env.production
3- .env.local
4- .env

The exception is for "test" where .env.local will never be checked.
If no NODE_ENV is set, the first two will not be checked.
The files must follow the rules of dotenv plus variable expansion:

https://github.com/motdotla/dotenv#rules
`);
    })
    .action(function(command, commandOptions, cmd) {
      console.log(command, commandOptions);
      const nodeEnv = ['development', 'production', 'test'].filter(
        val => cmd[val]
      )[0];

      if (nodeEnv) env.NODE_ENV = nodeEnv;

      require('../lib');
      const proc = spawn(command, commandOptions, {
        stdio: 'inherit',
        env: env,
      });
      process.on('SIGTERM', () => proc.kill('SIGTERM'));
      process.on('SIGINT', () => proc.kill('SIGINT'));
      process.on('SIGBREAK', () => proc.kill('SIGBREAK'));
      process.on('SIGHUP', () => proc.kill('SIGHUP'));
      proc.on('exit', process.exit);
      return proc;
    });
  console.log('argv', argv);
  program.parse(argv);
  return program;
}

module.exports = cli;
