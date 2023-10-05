import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import { userService } from "../service/userService";
import { authService } from "../service/authService";
import { User } from "../model/user.entity";
import { UserRegisterDto } from "./dto/UserRegisterDto";
import { UserLoginDto, UserLoginResponseDto } from "./dto/UserLoginDto";
import { WithSessionUser } from "../providers/authorization";
import MailService from "../service/mailService";

@JsonController()
export class UserController {
	/**
	 * Faz o cadastro de um usuário.
	 * @param user
	 * @returns
	 */
	@Post("/users/register")
	async register(@Body() payload: UserRegisterDto) {
		const userObj = new User();

		userObj.name = payload.name;
		userObj.email = payload.email;
		userObj.cpf = payload.cpf;
		userObj.phone = payload.phone;

		const password = payload.password;

		const response = await userService.registerUser(userObj, password);

		return response;
	}

	/**
	 * Faz o login de um usuário.
	 * O request body é composto de username e senha. Se a autenticação é
	 * validada, retorna um SessionToken para o usuário. Esse SessionToken deve
	 * ser usado para acessar endpoints que requerem login.
	 */
	@Post("/users/login")
	async login(@Body() loginRequest: UserLoginDto): Promise<UserLoginResponseDto> {
		const token = await authService.login(loginRequest.username, loginRequest.password);

		return {
			token: token.token_value,
			expires_at: token.expires_at.toISOString(),
		};
	}

	/**
	 * Retorna o usuário atual. O usuário atual é o usuário correspondente ao
	 * SessionToken do request.
	 */
	@Get("/users/@me")
	@Authorized()
	async getCurrentUser(@WithSessionUser() sessionUser: User): Promise<User> {
		return sessionUser;
	}

	@Get("/users/:id")
	async getOne(@Param("id") id: number) {
		const user = await userService.getUser(id);

		if (user === null) {
			throw new NotFoundError("Usuário não encontrado.");
		}

		return user;
	}

	/**
	 * Retorna o token que vai ser autenticado. // não acho uma boa ideia, tem jeitos melhores de fazer isso mas da mt preguiça
	 */
	@Post("/users/reset/password")
	//@Get("/users/reset/password")
	//@Authorized()
	async resetPassword() {
		const mailService = new MailService();

		mailService.sendEmail("insira@um.email");

		return ;
	}
}
