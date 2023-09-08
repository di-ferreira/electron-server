import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import routes from './Routes';
const app = express();

app.use(cors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(routes);

export { httpServer, io };
