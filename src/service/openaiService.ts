import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/chat";

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
	public async makeRequest(text: string): Promise<any> {
        const functions = this.defineApiReturn();

		const params: ChatCompletionCreateParams = {
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: text }],
			functions: [functions],
			max_tokens: 5, 		// idk que numero colocar
			temperature: 0.2,   // between 0 and 2

		};

		const response = this.openIAApi.chat.completions.create(params);
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
						"This may contain the theme of the lesson plan, like: 'Loop and Conditios in Computer Science'",
				},
				objectives: {
					type: "string",
					description: "This may contain the objectives aborded in lesson plan",
				},
				duration: {
					type: "string",
					description: "How many time the class will take",
				},
				hability: {
					type: "string",
					description: "The hability that the student will improve in this lesson",
				},
				method: {
					type: "string",
					description: "Witch kind of methodology",
				},
				content: {
					type: "string",
					description: "The main content of the class",
				},
			},
			required: ["theme","objectives","duration","hability","method","content"],
		};

		const structure = {
			name: "returnResponse",
			description:
				"This function is responsible to return the function in te corect estructure to frontend",
			parameters: { params },
		};

		return structure;
	}
}
