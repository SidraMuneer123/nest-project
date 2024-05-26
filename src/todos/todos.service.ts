import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const createdTodo = new this.todoModel({ ...createTodoDto, userId });
    return createdTodo.save();
  }

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, userId }).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<Todo> {
    const updatedTodo = await this.todoModel.findOneAndUpdate({ _id: id, userId }, updateTodoDto, { new: true }).exec();
    if (!updatedTodo) {
      throw new NotFoundException('Todo not found');
    }
    return updatedTodo;
  }

  async delete(id: string, userId: string): Promise<void> {
    const result = await this.todoModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Todo not found');
    }
  }
}
