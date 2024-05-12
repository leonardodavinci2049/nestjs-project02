import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request antes222...', req.params.id);
    // Verifique se o ID é válido
    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID inválido');
    }
    console.log('Request depois22...', req.params.id);
    // Continue para a próxima função de middleware ou rota
    next();
  }
}
/*
function isValidId(id: string): boolean {
  // Implemente sua lógica de validação de ID aqui
  // Por exemplo, você pode verificar se o ID é um número inteiro positivo

  // Exemplo de validação simples:
  return /^\d+$/.test(id);
}
*/
