import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateEventDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}