import { Server, Socket } from 'socket.io';
import http from 'http';
import { match, enqueue, dequeue } from './match';

export interface userData {
  id: string;
  gender: string;
  age: string;
  mbti: string;
}

interface msgData {
  message: string;
  senderSocket: string;
  receiverSocket: string;
  timestamp: Date;
}

export const webSocket = (server: http.Server) => {
  const io = new Server(server);

  console.log(`now server can response socket.io request.`);

  io.on('connection', (socket: Socket) => {
    socket.on('init', async (data: userData) => {
      const matchResultJSON = await match(data);
      if (matchResultJSON === undefined) {
        enqueue(data.id, socket.id);
      } else {
        dequeue(data.id);

        const matchResult = JSON.parse(matchResultJSON);

        const user1Socket = socket.id;
        const user2Socket = matchResult.match_queue.socketID;

        const data1 = {
          opponentSocket: user2Socket,
          opponentID: matchResult.users.id,
          opponentMBTI: matchResult.users.mbti,
          opponenetAge: matchResult.users.age,
          opponenetGender: matchResult.users.gender,
        };

        const data2 = {
          opponentSocket: user1Socket,
          opponentID: data.id,
          opponentMBTI: data.mbti,
          opponenetAge: data.age,
          opponenetGender: data.gender,
        };
        io.to(user1Socket).emit('match', data1);
        io.to(user2Socket).emit('match', data2);

        console.log(`user match ${user1Socket} : ${user2Socket}`);
      }
    });

    socket.on('sendMsg', (data: msgData) => {
      console.log(
        `${data.senderSocket} send Message to ${data.receiverSocket}`
      );
      console.log(`MSG: ${data.message} (${data.timestamp})`);
      io.to(data.receiverSocket).emit('receiveMsg', data);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('opponenetDisconnected!', socket.id);
    });
  });
};
