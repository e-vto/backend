import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Company } from "./company.entity.js";

@Entity()
export class Event {
	/**
	 * ID do evento
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * A empresa onde o evento está cadastrado
	 */
	@OneToOne(() => Company)
	@JoinColumn()
	company: Company;

	/**
	 * O nome deste evento
	 */
	@Column()
	name: string;

	/**
	 * O usuário que criou este evento
	 */
	@OneToOne(() => User)
	@JoinColumn()
	created_by: User;
}
