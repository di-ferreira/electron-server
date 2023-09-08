import axios from 'axios';
import { io } from 'socket.io-client';

const URL = 'http://localhost:3000/';

export const api = axios.create({
  baseURL: URL,
});

export const socket = io(URL);
