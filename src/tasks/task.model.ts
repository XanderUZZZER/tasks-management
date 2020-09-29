import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tech'
  },
  resolver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tech'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  tookToResolving: {
    type: Date
  },
  resolved: {
    type: Date
  }
});

export interface Task extends mongoose.Document {
  id: string,
  creator?: string,
  resolver?: string,
  title: string,
  description: string,
  status: TaskStatus,
  created?: Date,
  tookToResolving: Date,
  resolved?: Date
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}