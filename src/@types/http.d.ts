import http from 'http';

declare module 'http' {
  interface Server {
    applyFunction(func: any, params?: any): Server;
  }
}

const applyFunction = function (func, params = null) {
  if (params) func(this, params);
  else func(this);
  return this;
};

http.Server.prototype.applyFunction = applyFunction;
