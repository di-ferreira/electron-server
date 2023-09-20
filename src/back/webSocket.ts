import { io } from './app';
import WhatsAppBot from './modules/Bot';

io.on('connection', (socket) => {
  io.emit('welcome');

  const whatsappBot = new WhatsAppBot();
  const ClientBot = whatsappBot.start('bot');

  socket.on('test', () => {
    console.log('teste recebido.');
  });
  socket.on('botConect', () => {
    console.log('bot conectado.');
  });
});
