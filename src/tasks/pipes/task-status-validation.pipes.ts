import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = {
    

  }
  transform(value: any) {
    return value;
  }
}
 