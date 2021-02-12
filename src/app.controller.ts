import { Controller, Render, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    root() {
        return { message: 'Hello world!' };
    }

    @Get('/getHello')
    getHello(): string {
        return this.appService.getHello();
    }
}
