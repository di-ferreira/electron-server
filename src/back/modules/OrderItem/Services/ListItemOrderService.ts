import {
  SearchParamsItemOrder,
  iItemOrder,
  iItemOrderRepository,
} from '../../../ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iOrderRepository } from '../../../ProjectTypes/Order/iOrder';
import AppError from '../../../errors/AppError';
import OrderRepository from '../../Order/Repository';
import ItemOrderRepository from '../Repository';

export default class ListItemOrderService {
  private itemOrderRepository: iItemOrderRepository;
  private orderRepository: iOrderRepository;

  constructor() {
    this.itemOrderRepository = new ItemOrderRepository();
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    order,
  }: SearchParamsItemOrder): Promise<iItemOrder[]> {
    let orderExists: iOrder;

    switch (typeof order) {
      case 'number':
        await this.orderRepository.findById(Number(order)).then((res) => {
          orderExists = res;
        });
        break;

      case 'object':
        orderExists = order;
        break;

      default:
        throw new AppError('This Item have a type unknown');
    }

    const newOrders = await this.itemOrderRepository.findByOrder(orderExists);

    return newOrders;
  }
}
