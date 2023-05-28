import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../providers/dataSource";
import { Logger } from "tslog";
import { Employee } from "../model/employee.entity";
import EmployeeDTO from "../controller/dto/EmployeeDTO";

const logger = new Logger({ name: "EmployeeService" });

export class EmployeeService {
	private employeeRepository: Repository<Employee>;

	constructor() {
		this.employeeRepository = AppDataSource.getRepository(Employee);
	}

	/**
	 * Registra um novo employee.
	 */
	public async create(employeeDto: EmployeeDTO): Promise<Employee> {
		let employee = this.employeeRepository.create({
			userId: employeeDto.userId,
			sectorId: employeeDto.sectorId,
			eventId: employeeDto.eventId,
			roleId: employeeDto.roleId,
		});

		employee = await this.employeeRepository.save(employee);

		return employee;
	}

	/**
	 * Retorna os employees relacionados a um evento.
	 * @param id Id do evento.
	 * @returns Um array com employees.
	 */
	public async getEmployeesForEvent(eventId: number): Promise<Employee[]> {
		const employees = await this.employeeRepository.find({ where: { eventId: eventId } });

		return employees;
	}

	/**
	 * Retorna todos os employees.
	 * @returns Todos os employees na table.
	 */
	public async getAll(): Promise<Employee[]> {
		const events = await this.employeeRepository.find();
		return events;
	}
}

export const employeeService = new EmployeeService();
