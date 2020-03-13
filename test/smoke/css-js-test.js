const glob = require('glob-all');
const path = require('path');

describe('Checking generated css and js files', () => {
  it('should generate html file', (done) => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
    ]);
    if(files.length > 0) {
      done();
    } else {
      throw new Error('no css/js was generted');
    }
  })
})