import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { iOrder } from '../../../ProjectTypes/Order/iOrder';
import { iPayment } from '../../../ProjectTypes/Payment/iPayment';
import { iPaymentMethod } from '../../../ProjectTypes/PaymentMethod/iPaymentMethod';
import { Order } from '../../Order/Entity';
import { PaymentMethod } from '../../PaymentMethod/Entity';

@Entity('payment')
export class Payment implements iPayment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: number;

  @OneToOne(() => PaymentMethod)
  @JoinColumn()
  method: iPaymentMethod;

  @ManyToOne(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order: iOrder;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date;
}
