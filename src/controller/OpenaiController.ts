import { Body, JsonController, Post } from "routing-controllers";
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto";


@JsonController()
export default class OpenaiController {

    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload
     * @returns plandto
    */
	@Post("/plan/create")
	async register(@Body() payload: OpenaiPayloadDto) {
		
        
        const response = 'testes';

		return response;
	}
}