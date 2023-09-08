/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpServer } from './app';
import AppDataSource from './infra/DataSource';
import './webSocket';

const port = 3000;
let InstanceServer: any = null;

const InitServer = (): void => {
  AppDataSource.initialize()
    .then(() => {
      InstanceServer = httpServer.listen(port, () =>
        console.log(`Server 🏃🏾 on 🚪 ${port}`)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

const StopServer = (): void => {
  if (InstanceServer) {
    InstanceServer.close(async () => {
      await AppDataSource.destroy();
      console.log('Server stopped ✋🏾.');
    });
    InstanceServer = null;
  }
};

export { InitServer, StopServer };
