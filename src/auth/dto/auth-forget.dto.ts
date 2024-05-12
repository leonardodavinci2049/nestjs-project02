import { IsEmail } from 'class-validator';

export class AuthForGetDto {
  @IsEmail({}, { message: 'Invalid email' })
  EMAIL_DE_LOGIN: string;
}
