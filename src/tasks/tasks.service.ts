import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  //   {
  //     id: uuidv4(),
  //     title: 'title1',
  //     description: 'description1',
  //     status: TaskStatus.OPEN
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'title2',
  //     description: 'description2',
  //     status: TaskStatus.IN_PROGRESS
  //   }
  // ];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

  async getAllTasks(): Promise<Task[]> {
    //return this.tasks;
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    // const { status, searchTerm } = filterDto;
    // let tasks = this.getAllTasks();

    // if (status) {
    //   tasks = tasks.filter(task => task.status === status);
    // }

    // if (searchTerm) {
    //   tasks = tasks.filter(task =>
    //     task.title.includes(searchTerm) ||
    //     task.description.includes(searchTerm)
    //   );
    // }

    //return tasks;

    return null;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // const { title, description } = createTaskDto;
    // const task: Task = {
    //   id: uuidv4(),
    //   title,
    //   description,
    //   status: TaskStatus.OPEN
    // }

    // this.tasks.push(task);
    // return task;

    const { title, description } = createTaskDto;

    const task = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN
    });

    const result = await task.save();
    console.log(result);
    return result;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
