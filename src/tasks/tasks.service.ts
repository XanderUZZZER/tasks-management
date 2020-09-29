import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tech } from '../auth/tech.model';

@Injectable()
export class TasksService {

  tasks: Task[] = [];

  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @InjectModel('Tech') private readonly techModel: Model<Tech>
  ) { }

  async getTasks(filterDto: GetTaskFilterDto, tech: Tech): Promise<Task[]> {
    const { status, searchTerm } = filterDto;

    let tasks = await this.taskModel.find({ creator: tech.id });

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (searchTerm) {
      tasks = tasks.filter(task =>
        task.title.includes(searchTerm) ||
        task.description.includes(searchTerm)
      );
    }

    return tasks;
  }

  async getTaskById(id: string, tech: Tech): Promise<Task> {

    console.log(id);
    console.log(tech);


    const found = await this.taskModel.findOne({ id, creator: tech.id });

    //const found = await this.taskModel.findOne(task => task.creator === tech.id);
    //const found = await this.taskModel.findOne(task => (task.id === id) && (task.creator === tech.id));

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, techDto: Tech): Promise<Task> {
    const { title, description } = createTaskDto;
    const tech = await this.techModel.findById(techDto.id).select('-password');
    const task = new this.taskModel({
      creator: tech,
      title,
      description,
      status: TaskStatus.OPEN
    });

    tech.createdTasks.unshift(task);
    await tech.save();
    const result = await task.save();
    console.log(result);
    return result;
  }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
