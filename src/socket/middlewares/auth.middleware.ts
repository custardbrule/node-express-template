import { ResponseModel } from '@server/models';
import { log } from 'console';
import { Socket } from 'socket.io';

const IsValid = (_auth: { [key: string]: any }): boolean => {
  log(_auth);
  return true;
};

const AuthSocketMiddleware = (socket: Socket, next) => {
  const auth = socket.handshake.auth;
  if (IsValid(auth)) return next();
  return next(ResponseModel.ErrorResponse(401, [], 'Unauthorized'));
};

export default AuthSocketMiddleware;
