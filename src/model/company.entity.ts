import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Company {
	/**
	 * ID da empresa
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * O CNPJ dessa empresa
	 */
	@Column({ length: 14, unique: true })
	cnpj: string;

	/**
	 * O nome deste cargo
	 */
	@Column()
	name: string;

	/**
	 * O usuário que é o responsável pela empresa
	 */
	@OneToOne(() => User)
	@JoinColumn()
	owner: User;
}
