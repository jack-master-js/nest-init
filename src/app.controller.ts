import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  Inject,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './validation.pipe';
import { Roles } from './roles.decorator';
import { LoggingInterceptor } from './logging.interceptor';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  @Roles('admin')
  getHello(@Query(new ValidationPipe()) id): string {
    return this.appService.getHello();
  }

  @Post('/math/wordcount')
  wordCount(
    @Body() { text }: { text: string },
  ): Observable<{ [key: string]: number }> {
    return this.client.send('math:wordcount', text);
  }
}
