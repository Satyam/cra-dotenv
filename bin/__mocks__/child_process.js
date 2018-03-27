const child_process = require.requireActual('child_process');
const mockSpawn = require('mock-spawn');

module.exports = Object.assign({}, child_process, { spawn: mockSpawn() });
