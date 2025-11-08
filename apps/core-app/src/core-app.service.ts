import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
