import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserNameEmailDto } from './dto/update-name-email';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
//import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}


  async create(data: CreateUserDto) {

  
    if (data.email == null || data.email == '') {
      throw new NotFoundException('O email é obrigatório.');
    }

    if (data.password == null || data.password == '') {
      throw new NotFoundException('A senha é obrigatória.');
    }

    if (data.name == null || data.name == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

   // console.log('SENHA: ' + SENHA);

    try {

     //   const salt = await bcrypt.genSalt(10);

      //  console.log('salt: ' + salt);

      data.password = await bcrypt.hash(data.password, 10);
      
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  


 /*    const offset = new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(Date.now() - offset);

    if (!data.DATADOCADASTRO) {
      data.DATADOCADASTRO = localDate;
    }
    if (!data.DT_UPDATE) {
      data.DT_UPDATE = localDate;
    } */
 
    return await this.userRepository.create(data);


  }

  async findAll() {
/*     return this.prisma.tbl_system_usuario.findMany({
      where: {
        EMAIL_DE_LOGIN: {
          contains: '@',
        },
      },
      take: 10,
      orderBy: {
        ID_USUARIO_SYSTEM: 'desc',
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        ID_PESSOA: true,
        LOGIN: true,
        NOME: true,
        EMAIL_DE_LOGIN: true,
        SENHA: true,
      },
    }); */
  }

  async findOne(id: number) {
    //there is the option to use findFirst or findMany but findUnique is more performant

    //console.log('id2: ' + id);
    await this.userExists(id);


    //console.log('id3: ' + id);
   /*  return this.prisma.tbl_system_usuario.findUnique({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        ID_PESSOA: true,
        LOGIN: true,
        NOME: true,  
        ROLE: true,  
        EMAIL_DE_LOGIN: true,
        SENHA: true,
      },
    }); */
  }

  async update(id: number, data: UpdateUserNameEmailDto) {
    await this.userExists(id);

   // data.SENHA = await bcrypt.hash(SENHA, 10);


  /*   return this.prisma.tbl_system_usuario.update({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
      data,
    }); */
  }

  async updatePartial(id: number, { name, email }: UpdatePatchUserDto) {
    await this.userExists(id);

    if (name == null || name == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

/*     return this.prisma.tbl_system_usuario.update({
      data: { NOME, LOGIN, EMAIL_DE_LOGIN },
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    }); */
  }

  async remove(id: number) {
    await this.userExists(id);

 /*    return this.prisma.tbl_system_usuario.delete({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    }); */
  }

  async userExists(id: number) {
/*     const user = await this.prisma.tbl_system_usuario.count({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    }); */

 /*    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    } */
  }
}
