import { Express } from 'express';
import http from 'http';
import ApplyTestNameSpace from './namespaces/test.namespace';
import ApplyDefaultNameSpace from './namespaces/default.namespace';
import { Server } from 'socket.io';
import '@server/utils/extension/server.extension';
import AuthSocketMiddleware from './middlewares/auth.middleware';

function UseSocket(app: Express) {
  const server = http.createServer(app);
  const io = new Server(server, {
    serveClient: false,
    path: '/socket-entry',
    transports: ['websocket'],
  });

  io.use(AuthSocketMiddleware);
  io.applyFunction(ApplyDefaultNameSpace).applyFunction(ApplyTestNameSpace);

  return server;
}

export { UseSocket };
