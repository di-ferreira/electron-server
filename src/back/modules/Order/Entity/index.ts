import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { iAddress } from '../../../ProjectTypes/Address/iAddressService';
import { iCashRegister } from '../../../ProjectTypes/CashRegister/iCashRegisterService';
import { iCustomer } from '../../../ProjectTypes/Customer/iCustomerService';
import { iItemOrder } from '../../../ProjectTypes/ItemOrder/iItemOrder';
import { iOrder, iStatusOrder } from '../../../ProjectTypes/Order/iOrder';
import { iPayment } from '../../../ProjectTypes/Payment/iPayment';
import { Address } from '../../Address/Entity';
import { CashRegister } from '../../CashRegister/Entity';
import { Customer } from '../../Customer/Entity';
import { ItemOrder } from '../../OrderItem/Entity';
import { Payment } from '../../Payment/Entity';

@Entity('orders')
export class Order implements iOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne((type) => Customer, (customer) => customer.id, {
    eager: true,
    nullable: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'cliente_id' })
  customer: iCustomer;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  @Column({ type: 'text', nullable: true })
  obs: string;

  @Column({
    type: 'enum',
    enum: iStatusOrder,
    default: iStatusOrder.FILA,
  })
  status: iStatusOrder;

  @OneToMany((type) => ItemOrder, (ItemOrder) => ItemOrder.order, {
    cascade: true,
  })
  items: iItemOrder[];

  @ManyToOne(() => Address, (address) => address.order, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  deliveryAddress: iAddress;

  @OneToMany(() => Payment, (payment) => payment.order)
  payment: iPayment[];

  @ManyToOne(() => CashRegister, (cashRegister) => cashRegister.orders, {
    eager: true,
    onDelete: 'NO ACTION',
  })
  @JoinColumn([{ name: 'cash_register_id', referencedColumnName: 'id' }])
  cashRegister: iCashRegister;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
