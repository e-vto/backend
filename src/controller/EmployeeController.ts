import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import EmployeeDto from "./dto/EmployeeDTO";
import { employeeService } from "../service/employeeService";
import { User } from "../model/user.entity";

@JsonController("/employee")
export class EmployeeController {
	/**
	 * Faz o registro de um Employee.
	 * @param employee
	 * @returns O employee que foi registrado
	 */
	@Post("/register")
	@Authorized()
	async register(@Body() payload: EmployeeDto) {
		const EmployeeObj = new EmployeeDto();

		EmployeeObj.userId = payload.userId;
		EmployeeObj.eventId = payload.eventId;
		EmployeeObj.sectorId = payload.sectorId;
		EmployeeObj.roleId = payload.roleId;

		const response = await employeeService.create(EmployeeObj);

		return response;
	}

	/**
	 * Pega todos os employees relacionados a um evento.
	 * @param eventId
	 * @returns Os employees relacionados ao evento.
	 */
	@Get("/:id")
	async getOne(@Param("id") id: number) {
		const employees = await employeeService.getEmployeesForEvent(id);

		if (employees === null) {
			throw new NotFoundError("Evento não encontrado.");
		}

		return employees;
	}

	@Get("/getAll")
	@Authorized()
	async getAll() {
		const response = await employeeService.getAll();

		return response;
	}
}
