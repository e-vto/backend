import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Auth {
	/**
	 * ID de autenticação, é também o id do usuário
	 */
	@PrimaryColumn()
	@OneToOne(() => User)
	user_id: number;

	/**
	 * A senha do usuário
	 */
	@Column()
	password_hashed: string;
}
