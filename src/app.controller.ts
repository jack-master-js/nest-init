import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './validation.pipe';
import { Roles } from './roles.decorator';
import { LoggingInterceptor } from './logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles('admin')
  getHello(@Query(new ValidationPipe()) id): string {
    return this.appService.getHello();
  }
}
