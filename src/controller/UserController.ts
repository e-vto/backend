import {
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete,
	JsonController,
	NotFoundError,
} from "routing-controllers";
import { UserService } from "../service/userService";
import { User } from "../model/user.entity";
import { UserRegisterDto } from "./dto/userDto";

import { response } from "express";

@JsonController()
export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	@Get("/users")
	getAll() {
		return "This action returns all users";
	}

	@Get("/users/:id")
	async getOne(@Param("id") id: number) {
		const user = await this.userService.getUser(id);

		if (user === null) {
			throw new NotFoundError("Usuário não encontrado.");
		}

		return user;
	}

	@Post("/users")
	post(@Body() user: any) {
		return "Saving user...";
	}

	@Post("/users/register")
	register(@Body() user: UserRegisterDto) {
		const userObj = new User();
		userObj.name = user.name;
		userObj.email = user.email;
		userObj.cpf = user.cpf;
		userObj.phone = user.phone;
		userObj.birthdate = user.birthdate;

		const password = user.password;

		// https://stackoverflow.com/a/4121657
		// https://github.com/typeorm/typeorm/blob/master/docs/transactions.md

		// ::: CHAT :::
		//
		// class-validator
		//   - decorador
		//   - typescript
		// zod
		//   - typescript

		// ainda tem q validar todos os dados;

		const response = this.userService.registerUser(userObj, password);

		return response;
	}

	@Put("/users/:id")
	put(@Param("id") id: number, @Body() user: any) {
		return "Updating a user...";
	}

	@Delete("/users/:id")
	remove(@Param("id") id: number) {
		return "Removing user...";
	}
}
