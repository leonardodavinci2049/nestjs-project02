
import { Role } from '../core/enums/role.enum';
import { UpdatePatchUserDto } from '../user/dto/update-patch-user.dto';

export const updatePatchUserDTO: UpdatePatchUserDto = {
  role: Role.Admin,
};
