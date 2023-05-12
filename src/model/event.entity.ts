import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
	created_by: User;
}
