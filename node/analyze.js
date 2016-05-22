const log = require('./lib/log');

log.analyze(`${__dirname}/log`)
  .then(result => console.log(result))
  .catch(err => console.error(err));
