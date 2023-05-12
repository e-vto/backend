import { Repository } from "typeorm";
import { SessionToken } from "../model/sessionToken.entity";
import { User } from "../model/user.entity";
import { Auth } from "../model/auth.entity";
import { AppDataSource } from "../providers/dataSource";

import crypto from "crypto";
import { Logger } from "tslog";
import dayjs from "dayjs";

const logger = new Logger({ name: "authService" });

export class AuthService {
	private userRepository: Repository<User>;
	private authRepository: Repository<Auth>;
	private sessionTokenRepository: Repository<SessionToken>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
		this.authRepository = AppDataSource.getRepository(Auth);
		this.sessionTokenRepository = AppDataSource.getRepository(SessionToken);
	}

	async isUserLoggedIn(user: User): Promise<boolean> {
		return true;
	}

	async login(username: string, password_plaintext: string): Promise<SessionToken | null> {
		// Por hora, o username é o CPF
		const auth = await this.authRepository.findOne({ where: { user: { cpf: username } } });

		if (auth === null) {
			throw new Error("Informações de autenticação não cadastradas.");
		}

		const given_password = this.encodePassword(password_plaintext, auth.password_salt);
		const stored_password = auth.password_hashed;

		if (given_password !== stored_password) {
			throw new Error("A senha está incorreta.");
		}

		// Se chegamos aqui, o usuário estará autenticado.
		// 1. Remover/invalidar os tokens de acesso anteriores, de logins velhos
		// 2. Criar um novo token de acesso

		logger.debug("Usuário autenticado:", auth.user.cpf);

		// Remover tokens antigos para o usuário
		await this.sessionTokenRepository.delete({ user: auth.user });

		// Criar um novo token
		const token = this.generateToken(auth.user);

		// Guardar o token de autenticação
		await this.sessionTokenRepository.save(token);

		return token;
	}

	private generateToken(user: User): SessionToken {
		const base64 = (data: string) => Buffer.from(data).toString("base64");
		const randomData = () => crypto.randomBytes(16).toString("base64");

		const token = new SessionToken();

		token.user = user;
		token.token_value = base64(user.id.toString()) + ":" + randomData();
		token.created_at = dayjs().toDate();
		token.expires_at = dayjs().add(7, "days").toDate();

		return token;
	}

	private encodePassword(plaintext: string, salt: string) {
		return crypto
			.createHash("sha256")
			.update(plaintext + salt)
			.digest()
			.toString("base64");
	}

	private generateSalt(): string {
		return crypto.randomBytes(16).toString("base64");
	}
}
