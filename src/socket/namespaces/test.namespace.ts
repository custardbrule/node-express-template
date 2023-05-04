import { Server } from 'socket.io';

function ApplyTestNameSpace(io: Server) {
  const testNameSpace = io.of('/test');
  testNameSpace.on('connection', (socket) => {
    console.log('testNameSpace');
    socket.on('hello', (a) => {
      console.log(a);
    });
    io.emit('hello');
  });
  return io;
}

export default ApplyTestNameSpace;
