/* eslint-disable prettier/prettier */
import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    findAll() {
      throw new Error('Method not implemented.');
    }
    async createTask(createTaskDto: createTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
      }
}