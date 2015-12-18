var net = require('net');

function start(port) {
  var port = process.env.PORT || port;
  var client = net.connect({ port: port }, function() {
      console.log('Connected to chat server');
  });
  process.stdin.pipe(client);

  client.on('data', function(data) {
      console.log(data.toString());
  });
}

module.exports = {
  start: start,
};


