import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import RoleDto from "./dto/RoleDTO";
import { roleService } from "../service/roleService";
import { WithSessionUser } from "../providers/authorization";
import { User } from "../model/user.entity";

@JsonController("/role")
export class RoleController {
	/**
	 * Faz o registro de um cargo.
	 * @param role
	 * @returns O cargo que foi registrado
	 */
	@Post("/register")
	@Authorized()
	async register(@Body() payload: RoleDto,  @WithSessionUser() sessionUser: User) {
		const roleObj = new RoleDto();

		roleObj.name = payload.name;
		roleObj.eventId = payload.eventId;
        roleObj.created_by = sessionUser;

		const response = await roleService.create(roleObj);

		return response;
	}

	/**
	 * Pega todos os cargos relacionados a um evento.
	 * @param eventId
	 * @returns Os cargos relacionados ao evento.
	 */
	@Get("/:id")
	async getOne(@Param("id") id: number) {
		const employees = await roleService.getRolesForEvent(id);

		if (employees === null) {
			throw new NotFoundError("Evento não encontrado.");
		}

		return employees;
	}

	@Get("/getAll")
	@Authorized()
	async getAll() {
		const response = await roleService.getAll();

		return response;
	}
}
