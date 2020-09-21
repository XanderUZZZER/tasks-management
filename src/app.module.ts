import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb+srv://user:151086@tasksmanagement.v3sco.mongodb.net/TasksManagement?retryWrites=true&w=majority')]
})
export class AppModule { }
