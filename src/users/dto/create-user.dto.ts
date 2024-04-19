import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(34)
  password: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  firstName: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  lastName: string;
}
