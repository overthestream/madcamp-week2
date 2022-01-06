const http = require('http');
const server = require('./app');
const socket = require('./socket');

const PORT = 80;

const httpServer = http.createServer(server).listen(PORT, () => {
  console.log(`server start on port: ${PORT}`);
});

socket(httpServer);
