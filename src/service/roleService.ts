import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../providers/dataSource";
import { Logger } from "tslog";
import { Role } from "../model/role.entity";
import RoleDTO from "../controller/dto/RoleDTO";

const logger = new Logger({ name: "RoleService" });

export class RoleService {
	private roleRepository: Repository<Role>;

	constructor() {
		this.roleRepository = AppDataSource.getRepository(Role);
	}

	/**
	 * Registra um novo cargo.
	 */
	public async create(roleDTO: RoleDTO): Promise<Role> {
        let role = this.roleRepository.create({
            eventId: roleDTO.eventId,
            name: roleDTO.name,
            created_by: roleDTO.created_by
		});

		role = await this.roleRepository.save(role);

		return role;
	}

	/**
	 * Retorna os cargos relacionados a um evento.
	 * @param id Id do evento.
	 * @returns Um array com cargos.
	 */
	public async getRolesForEvent(eventId: number): Promise<Role[]> {
		const roles = await this.roleRepository.find({ where: { eventId: eventId } });

		return roles;
	}

	/**
	 * Retorna todos os cargos.
	 * @returns Todos os cargos na table.
	 */
	public async getAll(): Promise<Role[]> {
		const roles = await this.roleRepository.find();
		return roles;
	}
}

export const roleService = new RoleService();
