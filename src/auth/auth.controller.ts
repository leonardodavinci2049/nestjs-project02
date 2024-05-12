import {  BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';

import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthForGetDto } from './dto/auth-forget.dto';

import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtAuthGuard } from '../core/guards/jwt.auth.guard';
import { User } from 'src/core/decorators/user.decorator';
import {  FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {join} from 'path';
import { FileServiceV2 } from "src/file/file.service";
import { writeFile } from 'fs';


@Controller('auth')
export class AuthController {
  constructor(
              private readonly authService: AuthService,
              private readonly fileServiceV2: FileServiceV2
            ) {}

  @Post('login')
  async login(@Body() { LOGIN, EMAIL_DE_LOGIN, SENHA }: AuthLoginDto) {
    //console.log(LOGIN,EMAIL_DE_LOGIN, SENHA);
    return this.authService.login(LOGIN, EMAIL_DE_LOGIN, SENHA);
  } 

  @Post('register')
  async register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @Post('forget')
  async forget(@Body() body: AuthForGetDto) {
    return this.authService.forget(body.EMAIL_DE_LOGIN);
  }

  @Post('reset')
  async reset(@Body() { SENHA, TOKEN }: AuthResetDto) {
    return this.authService.reset(SENHA, TOKEN);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkToken')
  async checkToken(@Req() Req, @User('ID_USUARIO_SYSTEM') user) {

     //  Req.tokenPayload essa propriedade foi criada no jwt.auth.guard.ts
     //  O decorator @User foi criado manualmente]
     // Não precisa retornar os dados do usuário em uma verificação de token
     // O guard JwtAuthGuard é interessante porque posso colocar nos controles ou diretamente nas rotas

    // const token = headers.authorization.split(' ')[1];
    // return this.authService.checkToken( token );
    // return {message: 'Token Success', data: Req.tokenPayload, user: Req.user};

    return { message: 'Token Success', data1: Req.tokenPayload, data2: user };
  }


  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post('photov1')
  async uploadPhoto( @User('ID_USUARIO_SYSTEM') user , @UploadedFile() photo: Express.Multer.File) {

   // console.log(join(__dirname, '..', '..','src', 'core', 'storage', 'photos', `photo-${photo.originalname}`));
  
    try {

      const photoPath = join(__dirname, '..', '..','src', 'core', 'storage', 'photos', `photo-${user}-${photo.originalname}`);
       const result = writeFile(photoPath, photo.buffer, error => {
        if (!error) {
          console.log(`Translated to`);
        }
      }); 
      return { message: 'Sucesso no upload de arquivo', data1: user};
     // return {photo };
      
    } catch (e) {
      return { message: e.message };
    //  throw new BadRequestException(e);
    }
   // src/core/storage/photos/teste.js

    
   // 
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post('photov2')
  async uploadPhotov2(
      @User() user,
      @UploadedFile(new ParseFilePipe({
          validators: [
              new FileTypeValidator({fileType:'image/png'}), // somente typo imagem png
              new MaxFileSizeValidator({maxSize: 1024 * 50}), // em bayte
          ]
      })) photo: Express.Multer.File
  ) {

    const photoPath = join(__dirname, '..', '..','src', 'core', 'storage', 'photos', `photo-${user}-${photo.originalname}`);
      
      try {
       await this.fileServiceV2.upload(photo, photoPath);
      } catch (e) {
          throw new BadRequestException(e)
      }

      return {photo};
  }



  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(JwtAuthGuard)
  @Post('files')
  async uploadFiles( @User('ID_USUARIO_SYSTEM') user , @UploadedFiles() files: Express.Multer.File[]) {

   // console.log(join(__dirname, '..', '..','src', 'core', 'storage', 'photos', `photo-${photo.originalname}`));
  
    try {
      return {files}
    } catch (e) {
      return { message: e.message };
    //  throw new BadRequestException(e);
    }
   // src/core/storage/photos/teste.js

    
   // 
  }

  @UseInterceptors(FileFieldsInterceptor([{
    name: 'photo',
    maxCount: 1
}, {
    name: 'documents',
    maxCount: 10
}]))


@UseGuards(JwtAuthGuard)
@Post('files-fields')
async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}) {
    return files;
}

}
