const socketIO = require('socket.io');

const webSocket = server => {
  const socket = socketIO(server);
  console.log(`now server can response socket.io request.`);
  socket.on('connection', req => {
    console.log('connection info : ', req.request.connection._peername);

    socket.on('messageS', message => {
      console.dir(message);
      console.log('message 이벤트를 받았습니다.');

      if (message.recepient === 'ALL') {
        // 나를 포함한 모든 클라이언트에게 메시지 전달
        console.dir(
          '나를 포함한 모든 클라이언트에게 message 이벤트를 전송합니다.'
        );
        io.sockets.emit('messageC', message);
      }
    });
  });
};

module.exports = webSocket;
