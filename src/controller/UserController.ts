import {
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete,
	JsonController,
	OnNull,
	NotFoundError,
} from "routing-controllers";
import { UserService } from "../service/userService";

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

	@Put("/users/:id")
	put(@Param("id") id: number, @Body() user: any) {
		return "Updating a user...";
	}

	@Delete("/users/:id")
	remove(@Param("id") id: number) {
		return "Removing user...";
	}
}
