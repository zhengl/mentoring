var argv = require('yargs').argv;

var client = require('../client');
client.start(argv.p);
