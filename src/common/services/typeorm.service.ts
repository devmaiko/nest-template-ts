import * as dotenv from 'dotenv';

dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class TypeormService {
  public static getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migrations/*{.ts,.js}'],
    };
  }
}
