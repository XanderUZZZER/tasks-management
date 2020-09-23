import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  tech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tech'
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
  }
});

export interface Task extends mongoose.Document {
  id: string,
  tech?: string,
  title: string,
  description: string,
  status: TaskStatus
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}