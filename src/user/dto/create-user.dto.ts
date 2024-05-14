import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Role } from '../../core/enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}