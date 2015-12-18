var net = require('net');
var getMessage = require('./getMessage');

var clients = [];

var Client = function(options) {
  this.name = options.name || 'anonymous';
  this.socket = options.socket;
};

var server = net.createServer(function(socket) {
  var client = new Client({ socket: socket });
  clients.push(client);
  socket.on('data', function(data) {
    onClientMessage(client, data.toString());
  });

  socket.on('close', function() {
    onClientLeave(client);
  });

  socket.on('error', function() {
    onClientLeave(client);
  });
});

function onClientMessage(client, message) {
  if(isCommand(message)) {
    processCommand(getCommand(message), client);
  } else {
    var formattedMessage = getMessage(client.name, message)
    console.log(formattedMessage);
    broadcast(formattedMessage);
  }
}

function onClientLeave(client) {
  clients.splice(clients.indexOf(client), 1);
  var formattedMessage = getMessage(client.name, 'left the chat');
  console.log(formattedMessage);
  broadcast(formattedMessage);
}

function broadcast(message) {
  clients.forEach(function(client) {
    client.socket.write(message);
  });
}

function isCommand(message) {
  return message[0] === '/';
}

function getCommand(message) {
  var parts = message.substring(1).trim().split(' ');
  var name = parts.shift();
  return {
    name: name,
    args: parts,
  };
}

function getAllClientNames() {
  return clients.map(function(client) {
    return client.name;
  }).join('\n');
}

var commandMapping = {
  ping: onPing,
  name: onChangeName,
  list: onList,
  quit: onQuit,
};

function onPing(command, client) {
  client.socket.write('PONG');
}

function onChangeName(command, client) {
  client.name = command.args[0];
}

function onList(command, client) {
  client.socket.write(getAllClientNames());
}

function onQuit(command, client) {
  client.socket.destroy();
}

function processCommand(command, client) {
  var commandProcessor = commandMapping[command.name];

  if(commandProcessor) {
    commandProcessor(command, client);
  } else {
    client.socket.write('Unsupoorted command: ' + command.name);
  }
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
