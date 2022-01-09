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

interface talkData extends msgData {
  senderID: string;
  receiverID: string;
}

export const useSocket = (server: http.Server) => {
  const io = new Server(server);

  console.log(`now server can response socket.io request.`);

  io.on('connection', (socket: Socket) => {
    console.log(`socket connected.`);
    socket.on('init', async (data: userData) => {
      const matchResult = await match(data);
      if (matchResult === undefined) {
        enqueue(data.id, socket.id);
      } else {
        await dequeue(matchResult.id);

        const user1Socket = socket.id;
        const user2Socket = matchResult.socketid;

        const data1 = {
          opponentSocket: user2Socket,
          opponentID: matchResult.id,
          opponentMBTI: matchResult.mbti,
          opponenetAge: matchResult.age,
          opponenetGender: matchResult.gender,
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

    socket.on('sendTalk', (data: talkData) => {
      console.log(`${data.senderID} send Talk to ${data.receiverID}`);
      console.log(`TALK: ${data.message} (${data.timestamp})`);
      io.to(data.receiverSocket).emit('receiveTalk', data);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('opponenetDisconnected!', socket.id);
    });
  });
};
