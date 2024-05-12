import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateUserNameEmailDto } from './dto/update-name-email';
import { UpdatePathUserDto } from './dto/update-patch-user.dto';
//import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  const;

  async create({
    ID_SYSTEM_CFG_CLIENTE,
    ID_PESSOA,
    LOGIN,
    NOME,
    EMAIL_DE_LOGIN,
    SENHA,
    ROLE,
    DATADOCADASTRO,
    DT_UPDATE,
  }: CreateUserDto) {

  
    if (EMAIL_DE_LOGIN == null || EMAIL_DE_LOGIN == '') {
      throw new NotFoundException('O email é obrigatório.');
    }

    if (SENHA == null || SENHA == '') {
      throw new NotFoundException('A senha é obrigatória.');
    }

    if (NOME == null || NOME == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

   // console.log('SENHA: ' + SENHA);

    try {

     //   const salt = await bcrypt.genSalt(10);

      //  console.log('salt: ' + salt);

      SENHA = await bcrypt.hash(SENHA, 10);
      
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  


    const offset = new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(Date.now() - offset);

    if (!DATADOCADASTRO) {
      DATADOCADASTRO = localDate;
    }
    if (!DT_UPDATE) {
      DT_UPDATE = localDate;
    }

    return await this.prisma.tbl_system_usuario.create({
      data: {
        ID_SYSTEM_CFG_CLIENTE,
        ID_PESSOA,
        LOGIN,
        NOME,
        EMAIL_DE_LOGIN,
        SENHA,
        ROLE,
        DATADOCADASTRO,
        DT_UPDATE,
      },
      select: {
        ID_USUARIO_SYSTEM: true,
        ID_SYSTEM_CFG_CLIENTE: true,
        NOME: true,
        ROLE: true,
        EMAIL_DE_LOGIN: true,
        DATADOCADASTRO: true,
      },
    });
  }

  async findAll() {
    return this.prisma.tbl_system_usuario.findMany({
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
    });
  }

  async findOne(id: number) {
    //there is the option to use findFirst or findMany but findUnique is more performant

    //console.log('id2: ' + id);
    await this.userExists(id);


    //console.log('id3: ' + id);
    return this.prisma.tbl_system_usuario.findUnique({
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
    });
  }

  async update(id: number, data: UpdateUserNameEmailDto) {
    await this.userExists(id);

   // data.SENHA = await bcrypt.hash(SENHA, 10);


    return this.prisma.tbl_system_usuario.update({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
      data,
    });
  }

  async updatePartial(id: number, { NOME, LOGIN, EMAIL_DE_LOGIN }: UpdatePathUserDto) {
    await this.userExists(id);

    if (NOME == null || NOME == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

    return this.prisma.tbl_system_usuario.update({
      data: { NOME, LOGIN, EMAIL_DE_LOGIN },
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });
  }

  async remove(id: number) {
    await this.userExists(id);

    return this.prisma.tbl_system_usuario.delete({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });
  }

  async userExists(id: number) {
    const user = await this.prisma.tbl_system_usuario.count({
      where: {
        ID_USUARIO_SYSTEM: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    }
  }
}
