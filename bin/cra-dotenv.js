#! /usr/bin/env node
const spawn = require('cross-spawn').spawn;
require('../lib');

let sharedState = {
  exitCalled: false,
};
const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  printHelp();
  process.exit();
}

const proc = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
});

// Handle a few special signals and then the general node exit event
// on both parent and spawned process
process.once('SIGINT', TerminateSpawnedProc.bind(sharedState, proc));
process.once('SIGTERM', TerminateSpawnedProc.bind(sharedState, proc));
process.once('exit', TerminateSpawnedProc.bind(sharedState, proc));
proc.on('exit', TerminateParentProcess);

function printHelp() {
  console.log(`
Usage: cra-dotenv command [command options]

A simple utility for running a cli application using a set
of .env files as per the rules of create-react-app.

If the NODE_ENV environment variable is not set, it will 
assume NODE_ENV=development

Usually, it will be one of 'development', 'production' or 'test'.
`);
}

function TerminateSpawnedProc(proc) {
  if (!this.exitCalled) {
    this.exitCalled = true;
    proc.kill('SIGTERM');
  }
}

/**
 * Helper for terminating the parent process
 */
function TerminateParentProcess() {
  if (!this.exitCalled) {
    this.exitCalled = true;
    process.exit(1);
  }
}

function HandleUncaughtExceptions(e) {
  console.log(e.message);
  printHelp();
  process.exit(1);
}

process.on('uncaughtException', HandleUncaughtExceptions);
