import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class LessonPlan {
	/**
	 * Identificador único do plano.
	 */
	@PrimaryGeneratedColumn()
	id: number;

    /**
	 * O usuário referido
	 */
	@OneToOne(() => User, user => user.id, { eager: true })
	@JoinColumn()
	user: User;

    /**
	* Tema da aula vindo do GPT
	*/
    @Column()
    theme: string;

    /**
	* Objetivos da aula vindo do GPT
	*/
    @Column()
    objectives: string;

    /**
	* Duração da aula vindo do GPT
	*/
    @Column()
    duration: string;

    /**
	* Método da aula vindo do GPT
	*/
    @Column()
    method: string;

    /**
	* Conteúdo da aula vindo do GPT
	*/
    @Column()
    content: string;

    /**
	 * Nível de detalhamento
	 */
    @Column()
    detail: Float32Array;

    /**
	 * Nível de criatividade (temperature)
	 */
    @Column()
    creativity: Float32Array; // esse tipo deve estar errado

    /**
	 * Tamanho em quantidade de palavras
	 */
    @Column()
    size: Int16Array;

    /**
	 * Nível de detalhamento
	 */
    @Column()
    lesson_type: string;

    /**
	 * Prompt utilizada para gerar
	 */
    @Column()
    prompt: string;

    /**
	 * Data de criação
	 */
    @Column()
    create_date: Date;

}
