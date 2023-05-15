import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Event {
	/**
	 * ID do evento
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * O nome deste evento
	 */
	@Column({ unique: true })
	name: string;

	/**
	 * O usuário que criou este evento
	 */
	@OneToOne(() => User)
	@JoinColumn()
	created_by: User;
}
