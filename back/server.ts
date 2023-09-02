/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from './app';
import './webSocket';

const port = 3000;
let InstanceServer: any = null;

const InitServer = (): void => {
  InstanceServer = httpServer.listen(port, () =>
    console.log(`Server 🏃🏾 on 🚪 ${port}`)
  );
};

const StopServer = (): void => {
  if (InstanceServer) {
    InstanceServer.close(() => {
      console.log('Server stopped ✋🏾.');
    });
    InstanceServer = null;
  }
};

export { InitServer, StopServer };
