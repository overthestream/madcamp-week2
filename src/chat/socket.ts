import { Server, Socket } from 'socket.io';
import http from 'http';

const webSocket = (server: http.Server) => {
  const io = new Server(server);

  console.log(`now server can response socket.io request.`);
  io.on('connection', (socket: Socket) => {
    io.on('getOpponent', () => {
      const senderID = 'sample';
      const opponentID = matchOpponent(senderID);
      const data = { opponentID };
      socket.emit('match', data);
    });
  });
};

module.exports = webSocket;
