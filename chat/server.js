var net = require('net');
var getMessage = require('./getMessage');

var clients = [];

var Client = function(name, socket) {
  this.name = name || 'anonymous';
  this.socket = socket;
};

var server = net.createServer(function(socket) {
  var client = new Client(null, socket);
  clients.push(client);
  socket.on('data', function(data) {
    onClientMessage(client, data);
  });

  socket.on('error', function() {
    onClientLeave(client);
  });
});

function onClientMessage(client, data) {
  var message = getMessage(client.name, data.toString())
  console.log(message);
  broadcast(message);
}

function onClientLeave(client) {
  clients.splice(clients.indexOf(client), 1);
  var message = getMessage(client.name, 'left');
  console.log(message);
  broadcast(message);
}

function broadcast(message) {
  clients.forEach(function(client) {
    client.socket.write(message);
  });
}

function start(port) {
  var port = process.env.PORT || port;

  server.listen(port, function() {
    console.log('Server listening on http://localhost:%d, Ctrl+C to stop', port);
  });
}

module.exports = {
  start: start,
};
