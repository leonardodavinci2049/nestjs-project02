import { Role } from '../core/enums/role.enum';


export const updatePutUserDTO: UpdatePutUserDto = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: '123456',
  role: Role.User,
};
