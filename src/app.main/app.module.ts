import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
   // ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
     
    }]),  
    forwardRef(() => UserModule), 
    forwardRef(() => AuthModule)],

  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: ThrottlerGuard,    
  }],
  exports: [AppService],
})
export class AppModule {}
