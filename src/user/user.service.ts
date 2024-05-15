import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

 
    try {

     //   const salt = await bcrypt.genSalt(10);

      //  console.log('salt: ' + salt);

      data.password = await bcrypt.hash(data.password, 10);
      console.log('SENHA: ' + data.password);
 
     const user = this.userRepository.create(data);

     return this.userRepository.save(user);

     

      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  


 /*    const offset = new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(Date.now() - offset);

    if (!data.DATADOCADASTRO) {
      data.DATADOCADASTRO = localDate;
    }
    if (!data.DT_UPDATE) {
      data.DT_UPDATE = localDate;
    } */


  }

  async findAll() {
     return this.userRepository.find({
      take: 10
    }); 
  }

  async findOne(id: number) {
    //there is the option to use findFirst or findMany but findUnique is more performant

    //console.log('id2: ' + id);
    await this.userExists(id);


    //console.log('id3: ' + id);
    return this.userRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,      
        name: true,  
        role: true,  
        email: true
      },
    }); 
  }

  async update(id: number, data: CreateUserDto) {
    await this.userExists(id);

   data.password = await bcrypt.hash(data.password, 10);


    return this.userRepository.update(id, {    
        email: data.email,
        name: data.name,
        birthAt: data.birthAt ? new Date(data.birthAt) : null,
        role: data.role,
      }); 
  }

  async updatePartial(id: number, data: CreateUserDto) {
    await this.userExists(id);

    if (data.name == null || data.name == '') {
      throw new NotFoundException('O nome é obrigatório.');
    }

    return this.userRepository.update(id, data); 

  }

  async remove(id: number) {
    await this.userExists(id);

   return this.userRepository.delete(id); 
  }

  async userExists(id: number) {
     const user = await this.userRepository.count({
      where: {
        id: id,
      },
    }); 
  if (!user) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado.`);
    } 
  }
}
