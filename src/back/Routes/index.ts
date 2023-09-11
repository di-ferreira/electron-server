import express, { Request, Response, Router } from 'express';
import path from 'path';
import CashRegisterRoute from '../modules/CashRegister/Routes';
import CustomerRoute from '../modules/Customer/Routes';
import MenuRoute from '../modules/Menu/Routes';
import OrderRoute from '../modules/Order/Routes';
import ItemOrderRoute from '../modules/OrderItem/Routes';
import PaymentMethodRoute from '../modules/PaymentMethod/Routes';
import ProductRoute from '../modules/Product/Routes';
import TypeMenuRoute from '../modules/TypeMenu/Routes';

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

routes.use('/customers', CustomerRoute);
routes.use('/products', ProductRoute);
routes.use('/types-menu', TypeMenuRoute);
routes.use('/menus', MenuRoute);
routes.use('/orders', OrderRoute);
routes.use('/orders', ItemOrderRoute);
routes.use('/cash-registers', CashRegisterRoute);
routes.use('/payment-methods', PaymentMethodRoute);

export default routes;
