import { Server } from 'socket.io';

function ApplyTestNameSpace(io: Server) {
  const testNameSpace = io.of('/test');
  testNameSpace.on('connection', (socket) => {
    console.log('testNameSpace');
    socket.on('hello', (message) => {
      console.log(message);
      socket.emit('hello', message);
    });
  });
  return io;
}

export default ApplyTestNameSpace;
