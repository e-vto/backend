import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class RescueCode {
	/**
	 * Identificador único do token.
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Códico para ser digitado.
	 */
	@Column({ unique: true })
	code: string;

	/**
	 * Usuário associado ao código digitado.
	 */
	@OneToOne(() => User, { eager: true })
	@JoinColumn()
	user: User;

	/**
	 * Data de criação do código.
	 */
	created_at: Date;

	/**
	 * Data de expiração do código.
	 */
	expires_at: Date;
}
