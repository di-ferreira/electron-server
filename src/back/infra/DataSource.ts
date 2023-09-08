import {
  DataSource,
  DataSourceOptions,
  EntitySchema,
  MixedList,
} from 'typeorm';

import ApppConfig from '../../AppConfig';
import { Address } from '../modules/Address/Entity';
import { Customer } from '../modules/Customer/Entity';

const typeDB = ApppConfig.TYPE;

const ENTITIES: MixedList<string | Function | EntitySchema<any>> = [
  Customer,
  Address,
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
