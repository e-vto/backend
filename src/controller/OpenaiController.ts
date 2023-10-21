import { Body, Get, JsonController, Post, Authorized } from "routing-controllers";
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto.js";
import { OpenIaService } from "../service/openaiService.js";
import OpenaiResponseDto from "./dto/OpenaiResponseDto";
import { ChatCompletion } from "openai/resources/chat/index.js";
import lessonPLanDto from "./dto/LessonPlanDto.js";
import { LessonPlan } from "../model/lessonPlan.entity.js";
import { isNotEmpty } from "class-validator";
import { lessonPlanService } from "../service/lessonPlanService.js";

@JsonController()
export default class OpenaiController {
	/**
	 * Envia a requisição do plano para a openai.
	 * @param openaiPayload - Objeto com as informações para a API da Openai
	 * @returns planDto
	 */
	@Post("/plan/create")
	//@Authorized()
	public async register(@Body() payload: OpenaiPayloadDto) {
		const openai = new OpenIaService();

		const reqMessage = `Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;

		try {
			const response: ChatCompletion = await openai.makeRequest(
				reqMessage,
				payload.detailAmount,
				payload.creativityAmout,
				payload.maxLenght
			);

			if (response.choices[0].message.function_call == null) {
				throw new Error("GPT não retornou nenhuma resposta válida");
			} else {
				return response.choices[0].message.function_call.arguments;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Salva um plano de aula
	 * @param lessonPLanDto - Objeto com as informações do plano de aula
	 * @returns true or false
	 */
	@Post("/plan/save")
	public async save(@Body() payload: lessonPLanDto) {
		const lessonPlan = new LessonPlan();

		try{
			Object.assign(lessonPlan, payload);
			const savedPlan = lessonPlanService.savePlan(payload.userEmail, lessonPlan);
			
			if(isNotEmpty(savedPlan)) return true;

		}catch(erro){
			throw erro;
		}
	}

	@Get("/plan/:id")
	async getUserPlans() {}

	@Get("/ping")
	async ping() {
		return "pong 🏓";
	}
}
