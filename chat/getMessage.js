var moment = require('moment');

function getTimestamp() {
  return '[' + moment().format('hh:mm:ss') + ']';
}

module.exports = function(name, message) {
  return getTimestamp() + name + ': ' + message;
};
