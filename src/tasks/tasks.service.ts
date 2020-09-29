import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
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

    try {
      const found = await this.taskModel.findOne({ _id: id, creator: tech.id });

      if (!found) {
        throw new NotFoundException(`Task with ID ${id} not found for such tech ${tech.id}`);
      }
      return found;
    }
    catch (err) {
      throw new NotFoundException(err);
    }
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

  async deleteTask(id: string, tech: Tech): Promise<void> {

    try {
      const found = await this.getTaskById(id, tech);
      await this.taskModel.findByIdAndDelete({ _id: found.id });
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async updateTask(id: string, status: TaskStatus, tech: Tech): Promise<Task> {
    const task = await this.getTaskById(id, tech);
    task.status = status;
    if (status === TaskStatus.IN_PROGRESS) {
      task.tookToResolving = new Date();
      task.resolver = tech.id;
    } else if (status === TaskStatus.DONE) {
      task.resolved = new Date();
      task.resolver = tech.id;
    }
    await task.save();
    return task;
  }
}
