import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class SessionToken {
	/**
	 * Identificador único do token.
	 */
	@PrimaryGeneratedColumn()
	token_id: number;

	/**
	 * Valor único do token.
	 */
	@Column({ unique: true })
	token_value: string;

	/**
	 * Usuário associado ao token de sessão.
	 */
	@OneToOne(() => User, { eager: true })
	@JoinColumn()
	user: User;

	/**
	 * Data de criação do token.
	 */
	created_at: Date;

	/**
	 * Data de expiração do token.
	 */
	expires_at: Date;
}
