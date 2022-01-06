const socketIO = require('socket.io');

const webSocket = server => {
  const socket = socketIO(server);
  console.log(`now server can response socket.io request.`);
  socket.on('connect', req => {
    console.log('HIHIHI');
    console.log('connection info : ', req.request.connection._peername);
  });
};

module.exports = webSocket;
