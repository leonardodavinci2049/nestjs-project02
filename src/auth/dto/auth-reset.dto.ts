import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDto {
  @IsStrongPassword({ minLength: 6 }, { message: 'Password is too weak' })
  SENHA: string;
  @IsJWT()
  TOKEN: string;
}
