import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  async create(@Body(ValidationPipe) CreateTaskDto: CreateTaskDto) {
    return this.taskService.create(CreateTaskDto);
  }

  @Put('update')
  async update(@Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Get('getAll')
  async findAll() {
    return this.taskService.findAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
