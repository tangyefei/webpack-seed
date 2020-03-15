const path = require('path');


process.chdir(path.join(__dirname, 'smoke/template'));

console.error('test case get started...')

describe('build-webepack test caes', () => {
  require('./unit/webpack-base-test');
})