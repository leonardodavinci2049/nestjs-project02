import {
  Controller,
  Post,
  Put,
  Patch,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../core/decorators/role.decorator';
import { Role } from '../core/enums/role.enum';
import { JwtAuthGuard } from '../core/guards/jwt.auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { ParamId } from '../core/decorators/param-id.decorator';

//@UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
@UseGuards( JwtAuthGuard, RoleGuard) // a ordem dos guards importa
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    // console.log({ email, password });
    return this.userService.create(data);
  }


  @Get()
  findAll() {
    // return this.usersService.findAll();
    return this.userService.findAll();
  }


  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.userService.findOne(+id);
  }
  
  @Put(':id')
  async update(@Body() data: CreateUserDto, @Param('id', ParseIntPipe) id: number) {
    return this.userService.update(id, data);
  }
  
  @Patch('/partial/:id')
  async updatePartial(@Body() data: CreateUserDto, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  /*
  @Patch(':id')
  updatePatch(
    @Body()
    { name, email, password }: UpdatePathUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    //return this.userService.update(+id, updateUserDto);
    return {
      method: 'Patch',
      name,
      email,
      password,
      id,
    };
  }
  */

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
