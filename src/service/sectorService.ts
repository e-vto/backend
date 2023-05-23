import { Repository } from "typeorm";
import { AppDataSource } from "../providers/dataSource";
import { Logger } from "tslog";
import { Sector } from "../model/sector.entity";
import SectorDto from "../controller/dto/SectorDTO";

const logger = new Logger({ name: "CallService" });

export class SectorService {
	private sectorRepository: Repository<Sector>;

	constructor() {
		this.sectorRepository = AppDataSource.getRepository(Sector);
	}

	/**
	 * Registra um novo Setor.
	 */
	public async save(sectorDto: SectorDto): Promise<Sector> {
		let sector = this.sectorRepository.create({
			name: sectorDto.name,
            eventId: sectorDto.event,
			created_by: sectorDto.createdBy,
		});

		sector = await this.sectorRepository.save(sector);

		return sector;
	}

	/**
	 * Retorna os setores de um evento por seu id.
	 * @param id Id do evento.
	 * @returns Os setores do respectivo evento.
	 */
	public async getSectorForEvent(eventId: number): Promise<Sector[]> {
		const events = await this.sectorRepository.find({ where: { eventId: eventId } });

		return events;
	}

	/**
	 * Retorna todos os setores.
	 * @returns Todos os setores na table.
	 */
	public async getAll(): Promise<Sector[]>{
		const sectors = await this.sectorRepository.find();
		return sectors
	}
}

export const sectorService = new SectorService();
