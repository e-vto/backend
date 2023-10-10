import { Repository } from "typeorm";
import { User } from "../model/user.entity.js";
import { AppDataSource } from "../providers/dataSource.js";
import { authService } from "./authService.js";

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
	 * Registra um novo usuário.
	 * @param user - O objeto de usuário a ser salvo.
	 * @param password - A senha do usuário encriptada.
	 * @returns Uma Promise que resolve para o usuário salvo.
	 */
	public async registerUser(user: User, password: string): Promise<User> {
		const queryRunner = await AppDataSource.createQueryRunner();

		await queryRunner.startTransaction();

		try {
			// Insere o usuário no banco de dados
			const insertedUser = await this.userRepository.save(user);

			// Define a senha para o usuário
			await authService.setAuthInfoForUser(insertedUser, password);

			await queryRunner.release();

			return insertedUser;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw error;
		}
	}
}

export const userService = new UserService();
