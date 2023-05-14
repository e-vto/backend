import { IsString, IsEmail, IsPhoneNumber, Length, IsDateString } from "class-validator";

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

	@IsDateString()
	birthdate: string;

	@IsString()
	password: string;
}
