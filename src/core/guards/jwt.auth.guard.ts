import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {

    try {

      const request = context.switchToHttp().getRequest();// o objetivo é pegar o token do header da requisição
      const token = request.headers.authorization.split(' ')[1]; // o token é passado no header da requisição

      if (!token) {
        return false;
      } 
      const payload = this.authService.checkToken(token); // retorna o payload - foi escolhido checkToken en vez de is validToken porque retorna mais dados
       
      request.tokenPayload = payload; //cria essa propriedade no request para ser usada em outros lugares
    //  console.log('id1: ' + data.id);
      request.userRequest = await this.userService.findOne(payload.id);
     // console.log('userRequest: ' + request.userRequest);

     
      return true;
    } catch (error) {
      return false;
    }
  }
}
