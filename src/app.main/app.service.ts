import { Injectable } from '@nestjs/common';

function toLocalISOString(date: Date): string {
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - offset).toISOString().slice(0, -1);
  return localISOTime;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! as ' + toLocalISOString(new Date());
  }
}
