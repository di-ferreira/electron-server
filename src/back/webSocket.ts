import '../back/modules/Bot/Bot';
// import '../back/modules/Bot/index';
import { io } from './app';

io.on('connection', (socket) => {
  console.log('🚀 SocketID', socket.id);

  // socket.on('botConect', () => {
  //   const whatsappBot = new WhatsAppBot();
  //   console.log('Bot connected');
  //   const ClientBot = whatsappBot.start('bot');
  // });
});
