import { iCashRegisterRepository } from '../../../ProjectTypes/CashRegister/iCashRegisterService';
import {
  iCustomer,
  iCustomerRepository,
} from '../../../ProjectTypes/Customer/iCustomerService';
import {
  iItemOrder,
  iItemOrderRepository,
} from '../../../ProjectTypes/ItemOrder/iItemOrder';
import {
  iCreateOrder,
  iOrder,
  iOrderRepository,
} from '../../../ProjectTypes/Order/iOrder';
import { iPayment } from '../../../ProjectTypes/Payment/iPayment';
import AppError from '../../../errors/AppError';
import CashRegisterRepository from '../../CashRegister/Repository';
import CustomerRepository from '../../Customer/Repository';
import ItemOrderRepository from '../../OrderItem/Repository';
import OrderRepository from '../Repository';

class CreateOrderService {
  private orderRepository: iOrderRepository;
  private orderItemRepository: iItemOrderRepository;
  private cashRegisterRepository: iCashRegisterRepository;
  private customerRepository: iCustomerRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new ItemOrderRepository();
    this.cashRegisterRepository = new CashRegisterRepository();
    this.customerRepository = new CustomerRepository();
  }

  public async execute({
    customer,
    status,
    items,
    obs,
    deliveryAddress,
    payment,
  }: iCreateOrder): Promise<iOrder> {
    let customerExists: iCustomer;

    if (typeof customer === 'number') {
      customerExists = await this.customerRepository.findById(customer);
    } else {
      customerExists = await this.customerRepository.findById(customer.id);
    }

    if (!customerExists) {
      throw new AppError('There is not exists customer with ID');
    }

    const orderExists = await this.orderRepository.findOrderOpenByCustomer(
      customerExists
    );

    const cashRegister = await this.cashRegisterRepository.findOpened();

    if (!cashRegister) {
      throw new AppError('There is not already Cash Register open');
    }

    if (orderExists) {
      throw new AppError('There is already one order open this customer');
    }

    if (items.length < 1) {
      throw new AppError('Order not have a Items');
    }

    const CalcTotalItem = (item: iItemOrder): iItemOrder => {
      let result: iItemOrder = {
        ...item,
        total: item.menu.price * item.quantity,
      };
      return result;
    };

    const newItems: iItemOrder[] = items.map((item) => {
      if (!item.menu.active) {
        throw new AppError('Order cannot have an inactive item');
      }

      return CalcTotalItem(item);
    });

    const SumTotalTotal = (
      orderArray: iItemOrder[],
      propertyObject: 'total' | 'quantity'
    ) => {
      return orderArray.reduce((total: number, order: iItemOrder) => {
        return total + order[propertyObject];
      }, 0);
    };

    let totalOrder: number = 0;

    totalOrder = SumTotalTotal(newItems, 'total');

    if (payment) {
      let totalPayment: number = payment.reduce(
        (total: number, pay: iPayment) => {
          return (total += pay.value);
        },
        0
      );
      if (totalOrder !== totalPayment) {
        throw new AppError('Payment value is diferent of total order.');
      }
    }

    const order = await this.orderRepository.create({
      customer: customerExists,
      status,
      items: newItems,
      total: totalOrder,
      obs: obs && obs,
      deliveryAddress,
      cashRegister,
      payment,
    });

    let savedItems: iItemOrder[] = await this.orderItemRepository.findByOrder(
      order
    );

    const total = await this.orderRepository.findOrdersTotalByCashRegister(
      cashRegister
    );

    await this.cashRegisterRepository.save({
      id: cashRegister.id,
      total,
      open: cashRegister.open,
      openDate: cashRegister.openDate,
      orders: [],
    });

    return { ...order, items: savedItems, cashRegister };
  }
}

export default CreateOrderService;
