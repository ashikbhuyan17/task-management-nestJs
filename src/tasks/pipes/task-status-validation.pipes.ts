import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {TaskStatus} from '../task.model'
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = {
    
  }
  transform(value: any) {
    return value;
  }
}
