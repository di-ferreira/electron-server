import {
  DataSource,
  DataSourceOptions,
  EntitySchema,
  MixedList,
} from 'typeorm';

import ApppConfig from '../../AppConfig';
import { Address } from '../modules/Address/Entity';
import { CashRegister } from '../modules/CashRegister/Entity';
import { Customer } from '../modules/Customer/Entity';
import { Menu } from '../modules/Menu/Entity';
import { Order } from '../modules/Order/Entity';
import { ItemOrder } from '../modules/OrderItem/Entity';
import { Payment } from '../modules/Payment/Entity';
import { PaymentMethod } from '../modules/PaymentMethod/Entity';
import { Product } from '../modules/Product/Entity';
import { TypeMenu } from '../modules/TypeMenu/Entity';

const typeDB = ApppConfig.TYPE;

const ENTITIES: MixedList<string | Function | EntitySchema<any>> = [
  Address,
  CashRegister,
  Customer,
  Menu,
  Order,
  ItemOrder,
  Payment,
  PaymentMethod,
  Product,
  TypeMenu,
];

let DSConfigSQLite: DataSourceOptions = {
  type: 'better-sqlite3',
  database: ApppConfig.DATABASE_NAME,
  synchronize: ApppConfig.SINCRONIZE,
  entities: ENTITIES,
};

let DSConfigMySQL: DataSourceOptions = {
  type: 'mysql',
  host: ApppConfig.HOST,
  port: ApppConfig.PORT_DB,
  username: ApppConfig.USERNAME,
  password: ApppConfig.PASSWORD,
  database: ApppConfig.DATABASE_NAME,
  entities: ENTITIES,
  synchronize: ApppConfig.SINCRONIZE,
};

let DSConfigMariaDB: DataSourceOptions = {
  type: 'mariadb',
  host: ApppConfig.HOST,
  port: ApppConfig.PORT_DB,
  username: ApppConfig.USERNAME,
  password: ApppConfig.PASSWORD,
  database: ApppConfig.DATABASE_NAME,
  entities: ENTITIES,
  synchronize: ApppConfig.SINCRONIZE,
};

let DSConfig: DataSourceOptions = {} as DataSourceOptions;

switch (typeDB) {
  case 'mysql':
    DSConfig = DSConfigMySQL;
    break;
  case 'better-sqlite3':
    DSConfig = DSConfigSQLite;
    break;
  case 'mariadb':
    DSConfig = DSConfigMariaDB;
    break;

  default:
    break;
}

const AppDataSource = new DataSource(DSConfig);

export default AppDataSource;
