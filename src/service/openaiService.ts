import OpenAI from "openai";
import { ChatCompletionCreateParams } from "openai/resources/chat";

export class OpenIaService {
    private openIAApi: OpenAI;

    constructor(){

        const config = {
            apiKey: process.env.OPENAPI_TOKEN
        };

        this.openIAApi = new OpenAI(config);
    }


    /**
	 * Envia para a API da openIA o texto desejado.
	 * @param text texto a ser enviado.
	 * @returns retorna a resposta obtida pela API
	 */
    public async makeRequest(text: string): Promise<any>{
        
        const params:ChatCompletionCreateParams= {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: text}],
            functions: [{name: "teste", description: "teste", parameters: {}}]
        }

        const response = this.openIAApi.chat.completions.create(params);

    }
}