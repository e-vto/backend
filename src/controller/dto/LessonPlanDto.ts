import { IsString, IsNumber } from "class-validator";

export default class lessonPLanDto {
    /**
	 * Ementa da matéria
	 */
    @IsString()
    syllabus: string;

    @IsString()
    userEmail: string;

    /**
	 * Conteúdo formativo da aula
	 */
    @IsString()
    content: string;

    /**
	 * Quantidade de aulas disponíveis
	 */
    @IsNumber()
    classesQuantity: number;

    /**
	 * Nível de detalhamento
	 */
    @IsNumber()
    detail: Number;

    /**
	 * Nível de criatividade (temperature)
	 */
    @IsNumber()
    creativity: Number; // esse tipo deve estar errado

    /**
	 * Tamanho em quantidade de palavras
	 */
    @IsNumber()
    size: Number;

    /**
	 * Nível de detalhamento
	 */
    @IsString()
    lesson_type: string;

    /**
	 * Prompt utilizada para gerar
	 */
    @IsString()
    prompt: string;
}