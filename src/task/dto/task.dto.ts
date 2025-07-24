import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;
}

export class UpdateTaskDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  completed: boolean;

  @IsDate()
  updatedAt: Date;
}
