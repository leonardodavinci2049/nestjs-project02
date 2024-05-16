import { Role } from '../core/enums/role.enum';
import { CreateUserDto } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDto = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.User,
};
