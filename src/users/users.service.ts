import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  generateHash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.generateHash(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return user;
  }

  async update(userId: string, updateUserInput: UpdateUserDto): Promise<User> {
    if (updateUserInput.password) {
      updateUserInput.password = await this.generateHash(updateUserInput.password);
    }
    const user = await this.userRepository.preload({
      userId: userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string) {
    const user = await this.findOne(userId);
    return this.userRepository.remove(user);
  }
}
