import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
   // console.log('Before...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`URL: ${request.url}`);
       // console.log(`Method: ${request.method}`);
      //  console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
