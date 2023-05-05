import { Server } from 'socket.io';

function ApplyDefaultNameSpace(io: Server) {
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
  return io;
}

export default ApplyDefaultNameSpace;
