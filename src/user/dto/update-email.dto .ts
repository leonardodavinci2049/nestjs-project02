import { IsEmail } from 'class-validator';

export class UpdateUserEmailDto {
  LOGIN: string;
  NOME: string;
  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;
}
