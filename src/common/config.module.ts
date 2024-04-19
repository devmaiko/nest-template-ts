import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.example', '.env.example.example'],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test', 'provision').default('dev'),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5433),
        DB_USERNAME: Joi.string().default('dbuser'),
        DB_PASSWORD: Joi.string().default('dbpass'),
        DB_DATABASE: Joi.string().default('postgres'),
        JWT_SECRET: Joi.string().default('superCool21ADZCxzc'),
      }),
    }),
  ],
})
export class ConfigModule {}
