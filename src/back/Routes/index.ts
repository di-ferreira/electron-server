import express, { Request, Response, Router } from 'express';
import path from 'path';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  const { name } = req.query;
  let newName = 'Estranho';
  if (name) {
    newName = String(name);
  }
  return res.json({ result: `Olá ${newName}, seu servidor está pronto!` });
});

routes.use('/front', express.static(path.join(__dirname, '..', 'public')));

export default routes;
