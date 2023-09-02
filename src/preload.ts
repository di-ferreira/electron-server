// import { ipcRenderer } from 'electron';

// window.addEventListener('DOMContentLoaded', () => {
//   const startButton = document.getElementById('startButton');
//   const stopButton = document.getElementById('stopButton');
//   const serverStatus = document.getElementById('serverStatus');

//   startButton.addEventListener('click', () => {
//     ipcRenderer.send('start-server');
//     startButton.setAttribute('disabled', '');
//     stopButton.removeAttribute('disabled');
//   });

//   stopButton.addEventListener('click', () => {
//     ipcRenderer.send('stop-server');
//     startButton.removeAttribute('disabled');
//     stopButton.setAttribute('disabled', '');

//     serverStatus.innerHTML = 'Server Stoped!';
//   });

//   const consultaButton = document.getElementById('consultaButton');
//   const inputText = document.getElementById(
//     'nameInput'
//   ) as HTMLInputElement | null;

//   ipcRenderer.on('fetch-data-response', (event, data) => {
//     serverStatus.innerHTML = JSON.stringify(data.result);
//   });

//   if (consultaButton)
//     consultaButton.addEventListener('click', () => {
//       ipcRenderer.send('fetch-data', [{ name: inputText.value }]);
//     });
// });
