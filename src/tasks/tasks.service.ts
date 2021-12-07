import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string) {
    // return this.tasks.find((task) => task.id === id);
    const found = this.tasks.find((task) => task.id === id);
    if (found) {
      return found;
    } else {
      // throw new NotFoundException();
      throw new NotFoundException(`task with ID ${id} not found`); //with message
    }
  }

  //   createTask(title: string, description: string): Task {
  //     const task: Task = {
  //       id: uuid,
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     console.log(task);
  //     this.tasks.push(task);
  //     console.log('task', task);

  //     return task;
  //   }

  //dto process solve
  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    let id = 'as';
    const task: Task = {
      id: id + 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };
    // console.log(task);
    this.tasks.push(task);
    console.log('task', task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
