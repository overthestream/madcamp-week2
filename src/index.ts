import http from 'http';
import server from './app';
import { useSocket } from './chat/socket';

const PORT = 80;

const httpServer = http.createServer(server);

httpServer.listen(PORT, () => {
  console.log(`server start on port: ${PORT}`);
});

useSocket(httpServer);
