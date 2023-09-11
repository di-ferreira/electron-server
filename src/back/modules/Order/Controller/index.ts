import { Request, Response } from 'express';
import {
  iCreateOrder,
  iUpdatedOrder,
} from '../../../ProjectTypes/Order/iOrder';
import { iOrderController } from '../../../ProjectTypes/Order/iOrderController';
import CreateOrderService from '../Services/CreateOrderService';
import DeleteOrderService from '../Services/DeleteOrderService';
import ListOrderService from '../Services/ListOrderService';
import ShowOrderService from '../Services/ShowOrderService';
import UpdateOrderService from '../Services/UpdateOrderService';

export default class OrderController implements iOrderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = Number(request.query.page);
    const limit = Number(request.query.limit);
    const listOrder = new ListOrderService();

    const orders = await listOrder.execute({ page, limit });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id: Number(id) });
    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer, items, status, obs } = request.body;
    const createOrder = new CreateOrderService();

    let newOrder: iCreateOrder = {
      customer,
      items,
      status,
      obs,
      cashRegister: undefined,
    };

    const order = await createOrder.execute(newOrder);

    return response.status(201).json(order);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { items, obs, status } = request.body;

    const updateOrder = new UpdateOrderService();

    let updatedOrder: iUpdatedOrder = {
      id: Number(id),
      items: items && items,
      obs: obs && obs,
      status: status && status,
    };

    const order = await updateOrder.execute(updatedOrder);
    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteOrder = new DeleteOrderService();
    await deleteOrder.execute({ id: Number(id) });
    return response.status(204).json([]);
  }
}
