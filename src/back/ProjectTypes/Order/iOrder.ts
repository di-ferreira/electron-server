import { SearchParams } from '..';
import { iAddress } from '../Address/iAddressService';
import { iCashRegister } from '../CashRegister/iCashRegisterService';
import { iCustomer } from '../Customer/iCustomerService';
import { iItemOrder } from '../ItemOrder/iItemOrder';
import { iPayment } from '../Payment/iPayment';

export enum iStatusOrder {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}

export interface iCreateOrder {
  status: iStatusOrder;
  customer: iCustomer;
  items: iItemOrder[];
  deliveryAddress?: iAddress;
  payment?: iPayment[];
  cashRegister: iCashRegister;
  obs?: string;
}
export interface iSaveOrder {
  total: number;
  status: iStatusOrder;
  customer: iCustomer;
  items: iItemOrder[];
  cashRegister: iCashRegister;
  payment?: iPayment[];
  deliveryAddress?: iAddress;
  obs?: string;
}

export interface iShowOrder {
  id: number;
}

export interface iDeleteOrder {
  id: number;
}

export interface iUpdatedOrder {
  id: number;
  status?: iStatusOrder;
  items?: iItemOrder[];
  deliveryAddress?: iAddress;
  cashRegister?: iCashRegister;
  payment?: iPayment[];
  obs?: string;
}

export interface iOrder {
  id: number;
  total: number;
  customer: iCustomer;
  status: iStatusOrder;
  items: iItemOrder[];
  deliveryAddress?: iAddress;
  cashRegister: iCashRegister;
  payment: iPayment[];
  obs?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export type SearchParamsOrder = {
  page: number;
  limit: number;
  param: any;
};

export interface iOrderList {
  per_page: number;
  total: number;
  current_page: number;
  data: iOrder[];
}
export interface iOrderRepository {
  findAll({ page, limit }: SearchParams): Promise<iOrderList>;
  findById(orderID: number): Promise<iOrder | null>;
  findOrderOpenByCustomer(customer: iCustomer): Promise<iOrder | null>;
  findOrdersByCashRegister({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList>;

  findOrdersTotalByCashRegister(cashRegister: iCashRegister): Promise<number>;

  findByCustomer({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList | null>;
  findByStatus({
    limit,
    page,
    param,
  }: SearchParamsOrder): Promise<iOrderList | null>;
  create(data: iSaveOrder): Promise<iOrder>;
  save(order: iOrder): Promise<iOrder>;
  remove(order: iOrder): Promise<void>;
}
