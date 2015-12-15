var argv = require('yargs').argv;

var server = require('../server');
server.start(argv.p);
