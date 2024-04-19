import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const TYPE_ORM_CONFIG = {
  keepConnectionAlive: true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: async (configService: ConfigService) => ({
        keepConnectionAlive: true,
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        cli: {
          entitiesDir: '**/entities/**/*.entity{.js,.ts}',
        },
        ssl:
          process.env['PG_CA'] != null
            ? {
                ca: Buffer.from(process.env['PG_CA'], 'base64'),
              }
            : null,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
