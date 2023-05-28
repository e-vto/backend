import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import CallDto from "./dto/CallDTO";
import { callService } from "../service/callService";
import { WithSessionUser } from "../providers/authorization";
import { User } from "../model/user.entity";

@JsonController("/call")
export class CallController {

	/**
	 * Faz o registro de uma call.
	 * @param call
	 * @returns A call que foi registrado
	 */
	@Post("/register")
    @Authorized()
	async register(@Body() payload: CallDto, @WithSessionUser() sessionUser: User) {
		const callObj = new CallDto();

		callObj.author = sessionUser;
		callObj.sector = payload.sector;
		callObj.event = payload.event;
		callObj.content = payload.content;

		const response = await callService.createCall(callObj)

		return response;
	}

	/**
	 * Pega todos os chamados relacionados a um evento.
	 * @param eventId
	 * @returns Os chamados relacionados ao evento.
	 */
	@Get("/:id")
	async getOne(@Param("id") id: number) {
		const calls = await callService.getCallsForEvent(id);

		if (calls === null) {
			throw new NotFoundError("Evento não encontrado.");
		}

		return calls;
	}

	@Get("/getAll")
    @Authorized()
	async getAll() {
		const response = await callService.getAll();

		return response;
	}
}
