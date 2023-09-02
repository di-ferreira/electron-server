import cors from 'cors';
import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: '*' } });

app.get('/', (req: Request, res: Response) => {
  const { name } = req.query;
  let newName = 'Estranho';
  if (name) {
    newName = String(name);
  }
  return res.json({ result: `Olá ${newName}, seu servidor está pronto!` });
});

app.use('/front', express.static(path.join(__dirname, 'public')));

export { httpServer, io };
