import { Response } from 'express';
import { Chat, Whatsapp, create } from 'venom-bot';
import AppError from '../../errors/AppError';

interface iImageBuffer {
  type: string;
  data: Buffer;
}

class WhatsAppBot {
  private client: Whatsapp;
  private isAutoReplyActive: boolean = true;

  constructor() {
    this.setupEventHandlers();
  }

  private createClient(sessionName: string) {
    create(
      sessionName,
      (base64Qr, asciiQR, attempts, urlCode) => {
        // console.log(asciiQR);
        // const PathToSaveQrCode = './src/assets/public/images/qrcode.png';
        // converBase64ToImage(base64Qr, PathToSaveQrCode);

        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response: iImageBuffer = {} as iImageBuffer;

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');

        var imageBuffer = response;
        require('fs').writeFile(
          //   './back/public/assets/images/qrcode.png',
          './src/front/src/assets/qrcode.png',
          imageBuffer['data'],
          'binary',
          function (err: any) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      undefined,
      {
        folderNameToken: `./${sessionName}`,
        logQR: false,
      }
    )
      .then((value) => (this.client = value))
      .catch((error) => {
        throw new AppError(error);
      });
  }

  private setupEventHandlers() {
    console.log('hi');
    if (this.client) {
      this.client.onMessage(async (message) => {
        console.log('Mensagem recebida:', message.body);

        if (this.isAutoReplyActive) {
          // Adicione a lógica para responder automaticamente aqui
          if (
            message.body.toLowerCase() === 'hi' &&
            message.isGroupMsg === false
          ) {
            this.client
              .sendText(message.from, 'Welcome Venom 🕷')
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
          }
        } else {
          // Lógica para tratar as mensagens manualmente ou responder que a resposta automática está pausada
          // ...
        }
      });

      this.client.onStateChange((state) => {
        console.log('Estado do cliente:', state);
        // Você pode adicionar lógica adicional conforme necessário
      });
    }
  }

  public async generateQRCode(res: Response) {
    const qrCode = await this.client.getQrCode();
    console.log(
      '🚀 ~ file: index.ts:50 ~ WhatsAppBot ~ generateQRCode ~ qrCode:',
      qrCode
    );
    // qr.toFileStream(res, qrCode, { type: 'png' });
  }

  public async start(sessionName: string) {
    this.createClient(sessionName);
    this.setupEventHandlers();
    return this.client;
  }

  public stop() {
    this.client.close();
  }

  public async UnReadMessages(): Promise<Chat[] | Object[]> {
    return await this.client.getAllMessagesInChat(
      '5522981136574@c.us',
      true,
      true
    );
  }

  public pauseAutoReply() {
    this.isAutoReplyActive = false;
  }

  public resumeAutoReply() {
    this.isAutoReplyActive = true;
  }
}

export default WhatsAppBot;
