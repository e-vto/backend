import { IsNumber, IsString, IsEmail, IsPhoneNumber, IsDate, Length } from "class-validator";

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

	@IsDate()
	birthdate: Date;

	@IsString()
	password: string;
}
