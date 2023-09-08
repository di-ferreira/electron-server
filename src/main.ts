import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import AppConfig from './AppConfig';
import { InitServer, StopServer } from './back/server';

const PORT = AppConfig.PORT;
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      devTools: true,
    },
  });

  InitServer();

  mainWindow.loadURL(`http://localhost:${PORT}/front/`);

  mainWindow.on('closed', () => {
    StopServer();
    app.quit();
  });

  mainWindow.maximize();
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
