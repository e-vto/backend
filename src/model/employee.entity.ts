import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Event } from "./event.entity.js";
import { Role } from "./role.entity.js";
import { Sector } from "./sector.entity.js";

@Entity()
export class Employee {
	/**
	 * ID do funcionário
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * A conta do usuário que este funcionário representa
	 */
	@OneToOne(() => User)
	@JoinColumn({ name: "userId" })
	user: User;

	@Column()
	userId: number;

	/**
	 * O setor do evento que este funcionário está registrado
	 */
	@OneToOne(() => Sector)
	@JoinColumn({ name: "sectorId" })
	sector: Sector;

	@Column()
	sectorId: number;

	/**
	 * O cargo deste funcionário
	 */
	@OneToOne(() => Role)
	@JoinColumn({ name: "roleId" })
	role: Role;

	@Column()
	roleId: number;

	/**
	 * O evento onde o funcionário está cadastrado
	 */
	@OneToOne(() => Event)
	@JoinColumn({ name: "eventId" })
	event: Event;

	@Column()
	eventId: number;
}
