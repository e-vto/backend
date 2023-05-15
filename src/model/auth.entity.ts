import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Auth {
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * O usuário referido
	 */
	@OneToOne(() => User, user => user.id, { eager: true })
	@JoinColumn()
	user: User;

	/**
	 * A senha do usuário
	 */
	@Column()
	password_hashed: string;

	/**
	 * A salt da senha, em plain-text.
	 * Ela deve ser concatenada após a senha, para obter o valor que deve ser guardado no banco.
	 * (algo como: sha256(plaintext_password + password_salt)
	 * O valor é único para cada usuário.
	 */
	@Column({ unique: true })
	password_salt: string;
}
