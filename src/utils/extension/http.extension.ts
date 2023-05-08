import http from 'http';

const applyFunction = function (func, params = null) {
  if (params) func(this, params);
  else func(this);
  return this;
};

http.Server.prototype.applyFunction = applyFunction;
