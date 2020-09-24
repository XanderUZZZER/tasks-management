import * as mongoose from 'mongoose';

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
  }
});

export interface Tech extends mongoose.Document {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  date: Date
}