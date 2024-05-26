import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
// import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://UserDb:pepsi658327@cluster0.0hhzm04.mongodb.net/"), 
    UsersModule,
    AuthModule,
    TodosModule
  
  ],
})
export class AppModule {}
