import { Repository } from "typeorm";
import { SessionToken } from "../model/sessionToken.entity.js";
import { User } from "../model/user.entity.js";
import { Auth } from "../model/auth.entity.js";
import { AppDataSource } from "../providers/dataSource.js";
import { Logger } from "tslog";
import crypto from "crypto";
import dayjs from "dayjs";

const logger = new Logger({ name: "authService" });

export class AuthService {
	private authRepository: Repository<Auth>;
	private sessionTokenRepository: Repository<SessionToken>;

	constructor() {
		this.authRepository = AppDataSource.getRepository(Auth);
		this.sessionTokenRepository = AppDataSource.getRepository(SessionToken);
	}

	/**
	 * Retorna o usuário associado a um token de login.
	 */
	async getUserFromSessionToken(token: string): Promise<User> {
		const sessionToken = await this.sessionTokenRepository.findOne({
			where: { token_value: token },
		});

		// Se o token não existir, ou se o token expirou, é inválido.
		if (sessionToken === null || sessionToken.expires_at <= new Date()) {
			throw new Error("Token de sessão inválido.");
		}

		return sessionToken.user;
	}

	async login(username: string, password_plaintext: string): Promise<SessionToken> {
		// Por hora, o username é o CPF
		const auth = await this.authRepository.findOne({
			relations: ["user"],
			where: { user: { cpf: username } },
		});

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
		await this.sessionTokenRepository.delete({ user: { id: auth.user.id } });

		// Criar um novo token
		const token = this.generateToken(auth.user);

		// Guardar o token de autenticação
		await this.sessionTokenRepository.save(token);

		return token;
	}

	/**
	 * Atualiza/registra as informações de login do usuário.
	 * @param auth - O objeto de auth a ser salvo.
	 * @returns Uma Promise que resolve com as informações de login criadas.
	 */
	public async setAuthInfoForUser(user: User, password: string): Promise<Auth> {
		// Remover informações antigas de auth do usuário
		await this.authRepository.delete({ user: { id: user.id } });

		const auth = new Auth();

		auth.user = user;
		auth.password_salt = this.generateSalt();
		auth.password_hashed = this.encodePassword(password, auth.password_salt);

		return await this.authRepository.save(auth);
	}

	/**
	 * Gera um token de sessão para o usuário dado.
	 * @param user O usuário em questão.
	 * @returns Um token de sessão para o usuário dado.
	 */
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

	/**
	 * Cria uma hash SHA-256 da senha do usuário com a salt dada.
	 * Essa hash deve ser guardada no banco como a senha do usuário.
	 * @param plaintext A senha do usuário.
	 * @param salt A salt da senha do usuário.
	 * @returns A hash criada.
	 */
	private encodePassword(plaintext: string, salt: string) {
		return crypto
			.createHash("sha256")
			.update(plaintext + salt)
			.digest()
			.toString("base64");
	}

	/**
	 * Gera o salt da senha. É um valor aleatório único para cada usuário, que deve ser guardado em plaintext no banco de dados.
	 * Previne ataques de "rainbow table"
	 * @returns Uma string aleatória.
	 */
	private generateSalt(): string {
		return crypto.randomBytes(16).toString("base64");
	}
}

export const authService = new AuthService();
