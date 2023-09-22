import { Whatsapp, create } from 'venom-bot';
import { io } from '../../app';
import AppError from '../../errors/AppError';

interface iImageBuffer {
  type: string;
  data: Buffer;
}
const QRCODE_PATH: string = './src/front/src/assets/qrcode.png';

io.on('connection', (socket) => {
  socket.on('message', (sessionName: string) => {
    create({
      session: sessionName,

      catchQR: (
        qrCode: string,
        asciiQR: string,
        attempt: number,
        urlCode: string
      ) => {
        console.log('🚀 ~ file: index.ts:22 ~ socket.on ~ qrCode:', qrCode);
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = qrCode.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response: iImageBuffer = {} as iImageBuffer;

        if (matches.length !== 3) {
          throw new AppError('Invalid input string');
        }
        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');

        var imageBuffer = response;

        io.emit('ready', qrCode);
        require('fs').writeFile(
          QRCODE_PATH,
          imageBuffer['data'],
          'binary',
          function (err: any) {
            if (err != null) {
              throw new AppError(err);
            }
          }
        );
      },
      folderNameToken: `./${sessionName}-cache`,
      logQR: true,
    })
      .then((client) => {
        setupEventHandlers(client);
      })
      .catch((error) => {
        throw new AppError(error);
      });
  });

  const setupEventHandlers = async (Client: Whatsapp) => {
    await Client.onStateChange((state) => {
      io.emit('message', state);
      console.log('Change state:', state);
    });
    await Client.waitForQrCodeScan(
      (qrCode: string, asciiQR: string, attempt: number, urlCode?: string) => {
        console.log(qrCode);
      }
    );
  };

  socket.on('ready', () => {
    setTimeout(() => {
      console.log('ready');
      // io.emit('ready', 'qrcode.png');
    }, 3000);
  });
});

// if (this.client) {
//   this.client.onMessage(async (message) => {
//     console.log('Mensagem recebida:', message.body);

//     if (this.isAutoReplyActive) {
//       // Adicione a lógica para responder automaticamente aqui
//       if (
//         message.body.toLowerCase() === 'hi' &&
//         message.isGroupMsg === false
//       ) {
//         this.client
//           .sendText(message.from, 'Welcome Venom 🕷')
//           .then((result) => {
//             console.log('Result: ', result); //return object success
//           })
//           .catch((erro) => {
//             console.error('Error when sending: ', erro); //return object error
//           });
//       }
//     } else {
//       // Lógica para tratar as mensagens manualmente ou responder que a resposta automática está pausada
//       // ...
//     }
//   });

//   this.client.onStateChange((state) => {
//     io.emit('botState', state);
//   });
//   io.on('scanQR', () => {
//     setTimeout(() => {
//       console.log('Scan QR');
//       io.emit('qrCode', this.qrCodePath);
//     }, 3000);
//   });
// }

// class WhatsAppBot {
//   private client: Whatsapp;
//   private isAutoReplyActive: boolean = true;
//   //'./back/public/assets/images/qrcode.png',
//   private qrCodePath: string = './src/front/src/assets/qrcode.png';

//   constructor() {}

//   private createClient(sessionName: string) {}

//   public async generateQRCode(res: Response) {
//     const qrCode = await this.client.getQrCode();
//     console.log(
//       '🚀 ~ file: index.ts:50 ~ WhatsAppBot ~ generateQRCode ~ qrCode:',
//       qrCode
//     );
//     // qr.toFileStream(res, qrCode, { type: 'png' });
//   }

//   public async start(sessionName: string) {
//     this.createClient(sessionName);
//     return this.client;
//   }

//   public stop() {
//     this.client.close();
//   }

//   public async UnReadMessages(): Promise<Chat[] | Object[]> {
//     return await this.client.getAllMessagesInChat(
//       '5522981136574@c.us',
//       true,
//       true
//     );
//   }

//   public pauseAutoReply() {
//     this.isAutoReplyActive = false;
//   }

//   public resumeAutoReply() {
//     this.isAutoReplyActive = true;
//   }
// }

// export default WhatsAppBot;
