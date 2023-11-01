import OpenAI from "openai";
import { ChatCompletion, ChatCompletionCreateParams } from "openai/resources/chat";
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
	public async makeRequest(
		text: string,
		details: number,
		creativity: number,
		maxLenght: number
	): Promise<ChatCompletion> {
		const functions = this.defineApiReturn();

		const detailsVal = this.returnDetails(details);
		const creativityVal = this.returnCreativity(creativity);
		const maxLenghtVal = this.returnSize(maxLenght);

		const params: ChatCompletionCreateParams = {
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content:
						"Você fará o papel de um professor universitário que neste momento precisa elaborar um plano de aula  a partir da ementa e conteudos. Esses planos devem ser " + detailsVal + " e " + maxLenghtVal
				},
				{ role: "user", content: text },
			],
			functions: [functions],
			function_call: { name: "returnResponse" },
			max_tokens: 1024,
			temperature: creativityVal, // between 0 and 2
		};

		const response = this.openIAApi.chat.completions.create(params);

		const test = (await response).object;

		await console.log(test);

		return response;
	}

	/**
	 * Retorna a estruturação necessária para o retorno da API.
	 * @returns retorna a estrutura para a API
	 */
	private defineApiReturn(): ChatCompletionCreateParams.Function {
		const params = {
			type: "object",
			properties: {
				planArr: {
					type: "array",
					descripton: "lista de objetos dos dias de plano de aula",
					items: {
						type: "object",
						properties: {
							theme: {
								type: "string",
								description:
									"Deve conter o tema principal da aula, por exemplo: 'Laços e Condicionais na Computação'",
							},
							objectives: {
								type: "array",
								description:
									"Devem conter os objetivos de aprendizado do plano de aprendizagem",
								items: {
									type: "string",
									description: "Um subtópico do plano de aula. Um parágrafo apenas. Não inclua Markdown nem HTML"
								}
							},
							duration: {
								type: "string",
								description: "Quantidade de aulas/turnos/encontros necessários para o ensino do conteúdo",
							},
							// method: {
							// 	type: "string",
							// 	description: "Qual o tipo de metodologia será abordada",
							// },
							content: {
								type: "array",
								description: "Os conteúdos principal do plano de aula",
								items: {
									type: "string",
									description: "Um conteúdo."
								}
							},
						},
					},
				},
			},
			//required: ["theme","objectives","duration","method","content", "planArr"]
			required: ["planArr"],
		};

		const structure: ChatCompletionCreateParams.Function = {
			name: "returnResponse",
			description:
				"This function is responsible to return the function in te corect estructure to backend",
			parameters: params,
		};

		console.log(structure);

		return structure;
	}

	/**
	 * Verificar o nível de detalhamento necessário.
	 * @param details - Valor numérico de 1 a 3 para o detalhamento
	 * @returns retorna o valor para o nível de detalhamento
	 */
	private returnDetails(details: number) {
		switch (details) {
			case 1:
				return "pouco detalhado";
			case 2:
				return "médio detalhado";
			case 3:
				return "muito detalhado";
			default:
				return "médio detalhado";
		}
	}

	/**
	 * Verificar o tamanho necessário.
	 * @param size - Valor numérico de 1 a 3 para o tamanho
	 * @returns retorna o valor para o tamanho
	 */
	private returnSize(size: number) {
		// aqui poderiamos usar valores que fossem nos tokens, mas melhor não
		switch (size) { 
			case 1:
				return "pouco comprimento";
			case 2:
				return "médio comprimento";
			case 3:
				return "muito comprido";
			default:
				return "médio comprimento";
		}
	}

	/**
	 * Verificar a criatividade necessária.
	 * @param size - Valor numérico de 1 a 3 para a criatividade
	 * @returns retorna o valor para a criatividade
	 */
	private returnCreativity(creativity: number) {
		switch (creativity) {
			case 1:
				return 0.5;
			case 2:
				return 1;
			case 3:
				return 2;
			default:
				return 0.5;
		}
	}

}
