import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
import { Event } from "./event.entity.js";
import { Role } from "./role.entity.js";
import { Sector } from "./sector.entity.js";
import { Company } from "./company.entity.js";

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
	@JoinColumn()
	user: User;

	/**
	 * A empresa deste funcionário
	 */
	@OneToOne(() => Company)
	@JoinColumn()
	company: Company;

	/**
	 * O setor do evento que este funcionário está registrado
	 */
	@OneToOne(() => Sector)
	@JoinColumn()
	sector: Sector;

	/**
	 * O cargo deste funcionário
	 */
	@OneToOne(() => Role)
	@JoinColumn()
	role: Role;

	/**
	 * O evento onde o funcionário está cadastrado
	 */
	@OneToOne(() => Event)
	@JoinColumn()
	event: Event;
}
