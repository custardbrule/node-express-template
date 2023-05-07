import { Server } from 'socket.io';

declare module 'socket.io' {
  interface Server {
    applyFunction(func: any, params?: any): Server;
  }
}
