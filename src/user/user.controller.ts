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
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';

import { ParamId } from 'src/core/decorators/param-id.decorator';
import { UpdateUserEmailDto } from './dto/update-email.dto ';
import { Roles } from 'src/core/decorators/role.decorator';
import { Role } from 'src/core/enums/role.enum';
import { LogInterceptor } from 'src/core/interceptors/log.interceptors';
import { JwtAuthGuard } from 'src/core/guards/jwt.auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { ThrottlerGuard } from '@nestjs/throttler';


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
  async update(@Body() data: UpdateUserEmailDto, @Param('id', ParseIntPipe) id: number) {
    return this.userService.update(id, data);
  }
  
  @Patch('/partial/:id')
  async updatePartial(@Body() data: UpdateUserEmailDto, @Param('id', ParseIntPipe) id: number) {
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
