import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

export class ValidateIdPipe implements PipeTransform {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    if (/^\d+/i.test(value as string)) {
      return +value;
    } else {
      throw new BadRequestException('id must be a Number');
    }
  }
}
