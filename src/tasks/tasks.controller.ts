import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskStatusValidationPipe } from 'src/tasks/pipes/task-status-validation.pipes';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  //   @Post()
  //   createTask(@Body() body) {
  //     console.log('body', body);

  //   }

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     console.log('title', title);
  //     console.log('des', description);
  //     return this.tasksService.createTask(title, description);
  //   }

  // dto process solve
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: createTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }


  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status',TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    console.log(id, status);
    return this.tasksService.updateTaskStatus(id, status);
  }
}
