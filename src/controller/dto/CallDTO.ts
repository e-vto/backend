import { IsNumber, IsString } from 'class-validator';
import { User } from '../../model/user.entity';

export default class CallDto {
  //@Is() add validation
  author: User;

  @IsNumber()
  event: number;

  @IsNumber()
  sector: number;

  @IsString()
  content: string;
}