import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async update(taskId: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId.id,
      },
    });
    if (!task) {
      throw new Error('Task not found');
    }
    task.title = taskId.title ?? task.title;
    task.description = taskId.description ?? task.description;
    task.completed = taskId.completed ?? task.completed;
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    await this.taskRepository.remove(task);
  }
}
