import { Router } from 'express';
import AddressRoute from '../../Address/Routes';
import CustomerController from '../CustomerController';

const Controller = new CustomerController();

const CustomerRoute = Router();

CustomerRoute.post('/', Controller.create);
CustomerRoute.get('/', Controller.index);
CustomerRoute.get('/:phoneid', Controller.show);
CustomerRoute.put('/:id', Controller.update);
CustomerRoute.delete('/:id', Controller.delete);
CustomerRoute.use(AddressRoute);

export default CustomerRoute;
