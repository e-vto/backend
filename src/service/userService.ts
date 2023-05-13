import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import { AppDataSource } from "../providers/dataSource";
import { AuthService } from "./authService";
export class UserService {
	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	/**
	 * Obtém um usuário pelo seu ID.
	 * @param id O ID do usuário a ser buscado.
	 * @returns Uma Promise que resolve para um objeto do tipo User se o usuário for encontrado, ou null se não for encontrado.
	 */
	public async getUser(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { id: id } });

		return user;
	}

	/**
	 * Salva um usuário.
	 * @param user - O objeto de usuário a ser salvo.
	 * @returns Uma Promise que resolve para o usuário salvo.
	 */
	public async saveUser(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	/**
	 * Registra um novo usuário.
	 * @param user - O objeto de usuário a ser salvo.
	 * @param password - A senha do usuário encriptada.
	 * @returns Uma Promise que resolve para o usuário salvo.
	 */
	public async registerUser(user: User, password: string): Promise<Boolean> {
		// TECNINCAMENTE AQ A SENHA TEM QUE VIR ENCRIPTADA DO FRONT PRA DEPOIS DESENCRIPTAR
		const userResponse = await this.saveUser(user);

		if (userResponse === null) {
			throw new Error("Something got wrong on register the user");
		}

		const authResponse = await new AuthService().registerAuth(userResponse, password);

		return authResponse;
	}
}
