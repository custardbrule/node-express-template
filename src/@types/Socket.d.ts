import { Server } from 'socket.io';

declare module 'socket.io' {
  interface Server {
    applyFunction(func: any, params: any = null): Server;
  }
}

Server.prototypes.applyFunction = function (func, params) {
  if (params) func(this, params);
  else func(this);
  return this;
};
