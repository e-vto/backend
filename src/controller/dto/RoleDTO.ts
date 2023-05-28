import { IsNumber, IsString } from 'class-validator';
import { User } from '../../model/user.entity';

export default class EmployeDto {
  //@Is() add validation
  created_by: User;

  @IsString()
  name: string;

  @IsNumber()
  eventId: number;
}