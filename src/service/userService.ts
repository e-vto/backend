import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import { AppDataSource } from "../providers/dataSource";

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
}
