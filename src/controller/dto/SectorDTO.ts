import { IsNumber, IsObject, IsString } from 'class-validator';
import { User } from '../../model/user.entity';
import { Event } from '../../model/event.entity';

export default class SectorDto {
  @IsString()
  name: string;

  @IsNumber()// deve ser mudado futuramente
  event: number;

  //@IsObject() verify the type
  createdBy: User;
}