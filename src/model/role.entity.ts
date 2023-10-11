import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Event } from "./event.entity.js";

@Entity()
export class Role {
	/**
	 * ID do cargo
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * O evento onde o cargo está cadastrado
	 */
	@OneToOne(() => Event)
	@JoinColumn()
	event: Event;

	/**
	 * O nome deste cargo
	 */
	@Column()
	name: string;

	/**
	 * O usuário que criou este cargo
	 */
	@OneToOne(() => User)
	@JoinColumn()
	created_by: User;
}
