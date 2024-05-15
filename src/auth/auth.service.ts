import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

import { AuthRegisterDto } from './dto/auth-register.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private issuer = 'http://localhost.com';
  private audience = 'user';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }




  isValidToken(token: string) { // rota que válida o token
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
 

  

  async validateUser(payload: any) {
/*     return await this.prisma.tbl_system_usuario.findFirst({
      where: {
        ID_USUARIO_SYSTEM: payload.id,
      },
    }); */
  }

  async register(useRegister: AuthRegisterDto) {
    const user = await this.userService.create(useRegister);

    return this.createToken(user);
  }


  async login( email: string, password: string) {

    const userLogin = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });   


   // const user = await this.userLogin;


    console.log('USUÁRIO: ', {userLogin});

    if (!userLogin) {
      throw new UnauthorizedException('Login e/ou Senha Incorretos.');
    }
 
      if (!await bcrypt.compare(password, userLogin.password)) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
  } 




    return this.createToken(userLogin);
    //return this.createToken(user); */

  }

  async forget(email: string) {
     const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });   

    if (!user) {
      throw new UnauthorizedException('Email incorreto');
    } 


    const token = this.jwtService.sign({
      id: user.id
  }, {
      expiresIn: "30 minutes",
      subject: String(user.id),
      issuer: 'forget',
      audience: 'users',
  }); 
  





    return token;
  
  }

  async reset(password: string, token: string) {
    // To do: implementar a verificação do token
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: this.issuer, 
        audience: this.audience, 
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      await this.userRepository.update({     
        id: Number(data.id),
      },
      {
        password: password
      }); 

      const userPasswordReset = await this.userService.findOne( Number(data.id));
    



      return this.createToken(userPasswordReset);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

 
}