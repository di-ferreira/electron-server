import { existsSync, writeFile } from 'fs';
import qrcode from 'qrcode-terminal';
import { Client, LegacySessionAuth } from 'whatsapp-web.js';
import { io } from '../../app';

const SESSION_FILE_PATH = './session.json';
let sessionData: any;

if (existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

let client: Client;

io.on('connection', (socket) => {
  socket.on('message', (sessionName: string) => {
    client = new Client({
      authStrategy: new LegacySessionAuth({
        session: sessionData,
      }),
    });

    client.initialize();
  });
});

client.on('authenticated', (session) => {
  sessionData = session;
  writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err: any) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on('qr', (qr) => {
  console.log('🚀 ~ file: Bot.ts:11 ~ client.on ~ qr:', qr);
  qrcode.generate(qr, { small: true });
  io.emit('ready', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  console.log(message.body);
  io.emit('message.text', message.body);
});
