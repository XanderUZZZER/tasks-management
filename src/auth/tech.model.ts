import * as mongoose from 'mongoose';
import { Task } from 'src/tasks/task.model';

export const TechSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdTasks: [
    {
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    }
  ],
  inProgressTasks: [
    {
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    }
  ],
  resolvedTasks: [
    {
      task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    }
  ],
});

export interface Tech extends mongoose.Document {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  date: Date,
  createdTasks?: Array<Task>,
  inProgressTasks?: Array<Task>,
  resolvedTasks?: Array<Task>,
}