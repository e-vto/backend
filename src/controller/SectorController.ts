import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import SectorDto from "./dto/SectorDTO";
import { sectorService } from "../service/sectorService";
import { User } from "../model/user.entity";
import { WithSessionUser } from "../providers/authorization";

@JsonController("/sector")
export class SectorController {

	/**
	 * Faz o registro de um setor.
	 * @param sector
	 * @returns O setor criado
	 */
	@Post("/register")
    @Authorized()
	async register(@Body() payload: SectorDto,  @WithSessionUser() sessionUser: User) {
		const sectorObj = new SectorDto();

		sectorObj.name = payload.name;
		sectorObj.event = payload.event;
		sectorObj.createdBy = sessionUser;

		const response = await sectorService.save(sectorObj)

		return response;
	}

	/**
	 * Pega todos os setores relacionados a um evento.
	 * @param eventId
	 * @returns Os setores relacionados ao evento.
	 */
	@Get("/:id")
	async getOne(@Param("id") id: number) {
		const calls = await sectorService.getSectorForEvent(id);

		if (calls === null) {
			throw new NotFoundError("Evento não encontrado.");
		}

		return calls;
	}

	@Get("/getAll")
    @Authorized()
	async getAll() {
		const response = await sectorService.getAll();

		return response;
	}
}
