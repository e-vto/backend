import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Event } from "./event.entity.js";

@Entity()
export class Sector {
	/**
	 * ID do setor
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * O evento onde o setor está cadastrado
	 */
	@OneToOne(() => Event)
	event: Event;

	/**
	 * O nome deste setor
	 */
	@Column()
	name: string;

	/**
	 * O usuário que criou este setor
	 */
	@OneToOne(() => User)
	created_by: User;
}
