// __mocks__/fs.js
const path = require('path');

const fs = jest.genMockFromModule('fs');

fs.__mockFiles = {};

function readFileSync(filepath) {
  return fs.__mockFiles[filepath];
}

function existsSync(filepath) {
  return !!fs.__mockFiles[filepath];
}

fs.readFileSync = readFileSync;
fs.existsSync = existsSync;

module.exports = fs;