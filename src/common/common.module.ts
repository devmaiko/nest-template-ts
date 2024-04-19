import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { TypeormModule } from './typeorm.module';

@Module({
  imports: [ConfigModule, TypeormModule],
  exports: [ConfigModule, TypeormModule],
})
export class CommonModule {}
