import { Controller, Get } from '@nestjs/common';
import { CoreAppService } from './core-app.service';

@Controller()
export class CoreAppController {
  constructor(private readonly coreAppService: CoreAppService) {}

  @Get()
  getHello(): string {
    return this.coreAppService.getHello();
  }
}
