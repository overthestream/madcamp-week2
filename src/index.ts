const http = require('http');
const server = require('./app');
const useSocket = require('./socket');

const PORT = 80;

const httpServer = http.createServer(server);

httpServer.listen(PORT, () => {
  console.log(`server start on port: ${PORT}`);
});

useSocket(httpServer);
