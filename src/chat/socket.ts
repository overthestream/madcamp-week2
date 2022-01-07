import { Server, Socket } from 'socket.io';
import http from 'http';

interface userData {
  id: string;
  gender: string;
  age: string;
  mbti: string;
}

const webSocket = (server: http.Server) => {
  const io = new Server(server);

  console.log(`now server can response socket.io request.`);

  io.on('connection', (socket: Socket) => {
    socket.on('enqueue', () => {});
  });
};

module.exports = webSocket;
