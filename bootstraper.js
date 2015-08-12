// We need to call this as our entry point so that babel can get a
// hook into the main process.
require('babel/register');
// Now we call main...
require('./main.js');
