import { IsString, IsEmail, IsPhoneNumber, Length, IsDateString, isString } from "class-validator";

export class UserRegisterDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@Length(11)
	cpf: string;

	@IsPhoneNumber("BR")
	phone: string;

	@IsString()
	password: string;
}
