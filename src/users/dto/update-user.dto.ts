import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//partialType use everything but the params is optionals
export class UpdateUserDto extends PartialType(CreateUserDto) {}
