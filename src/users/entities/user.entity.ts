import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column({ nullable: true, default: '' })
  firstName: string;
  @Column({ nullable: true, default: '' })
  lastName: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  @ApiProperty({ readOnly: true })
  password: string;
  @Column({ nullable: true, default: 1 })
  permissionLevel: string;
}
