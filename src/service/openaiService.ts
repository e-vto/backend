import OpenAI from "openai";
import { ChatCompletion, ChatCompletionCreateParams } from "openai/resources/chat";
import { LessonPlan } from "../model/lessonPlan.entity";

export class OpenIaService {
	private openIAApi: OpenAI;

	constructor() {
		const config = {
			apiKey: process.env.OPENAPI_TOKEN,
		};

		this.openIAApi = new OpenAI(config);
	}

	/**
	 * Envia para a API da openIA o texto desejado.
	 * @param text texto a ser enviado.
	 * @returns retorna a resposta obtida pela API
	 */
	public async makeRequest(text: string): Promise<ChatCompletion>{
        const functions = this.defineApiReturn();

		const params: ChatCompletionCreateParams = {
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: text }],
			functions: [functions],
			max_tokens: 5, 		// idk que numero colocar
			temperature: 0.2,   // between 0 and 2

		};

		const response = this.openIAApi.chat.completions.create(params);

		const test = (await response).object;

		console.log(test);

		return response;
	}

	/**
	 * Retorna a estruturação necessária para o retorno da API.
	 * @returns retorna a estrutura para a API
	 */
	public defineApiReturn(): ChatCompletionCreateParams.Function {
		const params = {
			type: "object",
			properties: {
				theme: {
					type: "string",
					description:
						"Aqui deve-se conter o tema principal da aula, por exemplo: 'Laços e Condicionais na Computação'",
				},
				objectives: {
					type: "string",
					description: "Aqui devem conter os objetivos de aprendizado do plano de apredizagem",
				},
				duration: {
					type: "string",
					description: "Quanto tempo de aula será necessário",
				},
				method: {
					type: "string",
					description: "Qual o tipo de metodologia será abordada",
				},
				content: {
					type: "string",
					description: "O conteúdo principal do plano de aula",
				},
			},
			required: ["theme","objectives","duration","method","content"],
		};

		const structure = {
			name: "returnResponse",
			description:
				"This function is responsible to return the function in te corect estructure to backend",
			parameters: { params },
		};

		return structure;
	}
}
