import { IsString, Length } from "class-validator";

export class UserLoginDto {
	@IsString()
	@Length(11)
	username: string;

	@IsString()
	password: string;
}

export interface UserLoginResponseDto {
	token: string;
	expires_at: string;
}
