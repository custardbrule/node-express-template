import * as env from 'dotenv';
env.config({ path: './.env' });
import { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ApplyTestNameSpace from './namespaces/test.namespace';

function UseSocket(app: Express) {
  const server = http.createServer(app);
  const io = new Server(server, {
    serveClient: false,
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  ApplyTestNameSpace(io);

  return server;
}

export { UseSocket };
