import { IsString, IsNumber, IsArray } from "class-validator";

export default class OpenaiResponseDto {

    @IsArray()
    lessonPlanArray: Array<classPlan>;
}

class classPlan {

    /**
	* Tema da aula vindo do GPT
	*/
    @IsArray()
    theme: string;

    /**
	* Objetivos da aula vindo do GPT
	*/
    @IsArray()
    objectives: string;

    /**
	* Duração da aula vindo do GPT
	*/
    @IsArray()
    duration: string;

    /**
	* Método da aula vindo do GPT
	*/
    @IsArray()
    method: string;

    /**
	* Conteúdo da aula vindo do GPT
	*/
    @IsArray()
    content: string;
}