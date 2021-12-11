/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  async getAllTasks(){
    return await this.taskRepository.find();
 
  }


  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (found) {
      return found;
    } else {
      // throw new NotFoundException();
      throw new NotFoundException(`task with ID ${id} not found`); //with message
    }
  }

  // getTaskById(id: string) {
  //   // return this.tasks.find((task) => task.id === id);
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (found) {
  //     return found;
  //   } else {
  //     // throw new NotFoundException();
  //     throw new NotFoundException(`task with ID ${id} not found`); //with message
  //   }
  // }

  async createTask(createTaskDto: createTaskDto): Promise<any> {
    // const { title, description } = createTaskDto;
    // const task = new Task();
    // task.title = title;
    // task.description = description;
    // task.status = TaskStatus.OPEN;
    // await task.save();
    // return task;
    const users = this.taskRepository.createTask(createTaskDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users
    };
    
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
  // createTask(createTaskDto: createTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   let id = 'as';
  //   const task: Task = {
  //     id: id + 1,
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   // console.log(task);
  //   this.tasks.push(task);
  //   console.log('task', task);

  //   return task;
  // }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`task with id ${id} not found`);
    }
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
