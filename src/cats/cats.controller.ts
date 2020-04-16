import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {HttpExceptionFilter} from '../common/filter/http-exception.filter'
import {ValidationPipe} from '../common/pipe/validation.pipe'
import {AuthGuard} from '../common/guard/auth.guard'
import {LoggingInterceptor} from '../common/interceptor/logging.interceptor'
import {User} from '../common/decorator/user.decorator'

@Controller('cats')
// @UseGuards(new AuthGuard())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  @Post()
  // @UseFilters(HttpExceptionFilter)
  @UsePipes(ValidationPipe)
  create(@Body() cat) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    return cat;
  }

  @Get()
  findAll(@Query() query) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }

  @Get('decorator')
  findOneByDecorator(@User('name') name){
    return name
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() cat) {
    console.log(cat);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
