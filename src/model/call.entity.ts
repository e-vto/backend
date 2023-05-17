import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Employee } from "./employee.entity";
import { Event } from "./event.entity";
import { Sector } from "./sector.entity";

@Entity()
export class Call {
	/**
	 * ID do chamado
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * ID do autor do chamado
	 */
	@OneToOne(() => Employee, { nullable: true })
	@JoinColumn({ name: "authorId" })
	author: Employee;

	@Column()
	authorId: number;

	/**
	 * ID do evento relacionado ao chamado
	 */
	@OneToOne(() => Event, { nullable: true })
	@JoinColumn({ name: "eventId" })
	event: Event;

	@Column()
	eventId: number;

	/**
	 * ID do setor relacionado ao chamado
	 */
	@OneToOne(() => Sector, { nullable: true })
	@JoinColumn({ name: "sectorId" })
	sector: Sector;

	@Column()
	sectorId: number;

	/**
	 * Data e hora de criação do chamado
	 */
	@Column({ type: "datetime", nullable: true })
	creation_datetime: Date;

	/**
	 * Conteúdo do chamado
	 */
	@Column({ type: "text", nullable: true })
	content: string;

	/**
	 * Indica se o chamado foi resolvido
	 */
	@Column({ default: false })
	resolved: boolean;

	/**
	 * Data e hora de resolução do chamado
	 */
	@Column({ type: "datetime", nullable: true })
	resolved_datetime: Date;
}
