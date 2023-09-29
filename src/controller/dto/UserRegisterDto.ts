import { IsString, IsEmail, IsPhoneNumber, Length, IsDateString, isString } from "class-validator";

export class UserRegisterDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@Length(11)
	cpf: string;

	@IsString()
	sexo: string;

	@IsPhoneNumber("BR")
	phone: string;

	@IsDateString()
	birthdate: string;

	@IsString()
	password: string;
}
