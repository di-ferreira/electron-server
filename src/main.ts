import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { InitServer, StopServer } from '../back/server';

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    width: 1024,
  });

  // mainWindow.loadFile(path.join(__dirname, '../index.html'));
  mainWindow.loadURL('http://localhost:3000/front/');
  InitServer();
  ipcMain.on('start-server', () => {
    InitServer();
  });

  ipcMain.on('stop-server', () => {
    StopServer();
  });

  mainWindow.on('closed', () => {
    StopServer();
    app.quit();
  });

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
