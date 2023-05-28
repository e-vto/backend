import { IsNumber } from 'class-validator';

export default class EmployeDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  sectorId: number;

  @IsNumber()
  eventId: number;

  @IsNumber()
  roleId: number;
}