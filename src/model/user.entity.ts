import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	/**
	 * ID do usuário
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Nome do usuário
	 */
	@Column()
	name: string;

	/**
	 * E-mail do usuário
	 */
	@Column({ unique: true })
	email: string;

	/**
	 * CPF do usuário
	 */
	@Column({ length: 11, unique: true })
	cpf: string;

	/**
	 * Telefone celular.
	 */
	@Column({ length: 13, unique: true })
	phone: string;

	/**
	 * Data de nascimento do usuário
	 */
	@Column("date")
	birthdate: Date;
}
