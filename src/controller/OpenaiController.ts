import { Body, Get, JsonController, Post, Authorized } from "routing-controllers";
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto";
import { OpenIaService } from "../service/openaiService";
import { Logger } from "tslog";

@JsonController()
export default class OpenaiController {
	/**
	 * Envia a requisição do plano para a openai.
	 * @param openaiPayload - Objeto com as informações para a API da Openai
	 * @returns plandto
	 */
	@Post("/plan/create")
	//@Authorized()
	async register(@Body() payload: OpenaiPayloadDto) {
		const openai = new OpenIaService();

		const reqMessage =
			`Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;

		const response = openai.makeRequest(reqMessage);

		await console.log(response);

		return response;
	}

	@Get("/plan/:id")
	async getUserPlans() {}
}
