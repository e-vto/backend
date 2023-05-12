import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class SessionToken {
	@PrimaryGeneratedColumn()
	token_id: number;

	@Column({ unique: true })
	token_value: string;

	@OneToOne(() => User)
	user: User;

	created_at: Date;

	expires_at: Date;
}
