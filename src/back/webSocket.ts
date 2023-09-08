import { io } from './app';

io.on('connection', (socket) => {
  io.emit('welcome');

  socket.on('test', () => {
    console.log('teste recebido.');
  });
});
