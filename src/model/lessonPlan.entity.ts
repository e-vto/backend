import { Column, Entity, IntegerType, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
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
	 * Ementa da matéria
	 */
    @Column({comment: "EMENTA"})
    syllabus: string;

    /**
	 * Conteúdo formativo da aula
	 */
    @Column()
    content: string;

    /**
	 * Quantidade de aulas disponíveis
	 */
    @Column()
    classesQuantity: number;

    /**
	 * Nível de detalhamento
	 */
    @Column()
    detail: Number;

    /**
	 * Nível de criatividade (temperature)
	 */
    @Column()
    creativity: Number; // esse tipo deve estar errado

    /**
	 * Tamanho em quantidade de palavras
	 */
    @Column()
    size: Number;

    /**
	 * Tipo de aula
	 */
    @Column()
    lesson_type: string;

    /**
	 * texto do plano de aula
	 */
    @Column()
    text: string;

    /**
	 * Data de criação
	 */
    @Column()
    create_date: Date;

}
