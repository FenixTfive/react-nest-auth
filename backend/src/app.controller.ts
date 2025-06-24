import { Controller, Get } from '@nestjs/common';
import { VERSION } from './version';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {


  @Get()
  index() {
    return {
      name: 'one-on-one chat api',
      status: 'ok',
      version: VERSION,
    };
  }
}
