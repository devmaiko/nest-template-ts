import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { TYPE_ORM_CONFIG } from './src/common/typeorm.module';

export default new DataSource({
  type: 'postgres',
  host: TYPE_ORM_CONFIG.host,
  port: TYPE_ORM_CONFIG.port,
  username: TYPE_ORM_CONFIG.username,
  password: TYPE_ORM_CONFIG.password,
  database: TYPE_ORM_CONFIG.database,
  entities: TYPE_ORM_CONFIG.entities,
  migrations: TYPE_ORM_CONFIG.migrations,
});
