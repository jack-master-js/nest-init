import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //处理请求数据验证，在数据不正确时可以抛出异常，使用过滤器来捕获
    if (!value.id) {
      throw new BadRequestException('No data submitted');
    }
    return value;
  }
}
