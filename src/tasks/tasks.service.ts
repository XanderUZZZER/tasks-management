import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: uuidv4(),
      title: 'title1',
      description: 'description1',
      status: TaskStatus.OPEN
    },
    {
      id: uuidv4(),
      title: 'title2',
      description: 'description2',
      status: TaskStatus.IN_PROGRESS
    }
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, searchTerm } = filterDto;
    let tasks = this.getAllTasks();

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

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
