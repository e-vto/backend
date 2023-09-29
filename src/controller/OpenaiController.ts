import { Body, Get, JsonController, Post } from "routing-controllers";
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto";
import { OpenIaService } from "../service/openaiService";
import { Logger } from "tslog";


@JsonController()
export default class OpenaiController {

    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload
     * @returns plandto
    */
	//@Post("/plan/create")
	@Get("/plan/create")
	async register() { // @Body() payload: OpenaiPayloadDto 
		
        const openai = new OpenIaService();
        
        const response = openai.makeRequest('faça um plano de aula sobre lógica de programação');

        console.log(response);

		return response;
	}
}