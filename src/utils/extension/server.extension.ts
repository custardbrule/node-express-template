import { Server } from 'socket.io';

const applyFunction = function (func, params = null) {
  if (params) func(this, params);
  else func(this);
  return this;
};

Server.prototype.applyFunction = applyFunction;
