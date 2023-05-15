import { Repository } from "typeorm";
import { Event } from "../model/event.entity";
import { AppDataSource } from "../providers/dataSource";
import { Logger } from "tslog";
import { User } from "../model/user.entity";

const logger = new Logger({ name: "eventService" });

export class EventService {
	private eventRepository: Repository<Event>;

	constructor() {
		this.eventRepository = AppDataSource.getRepository(Event);
	}

    /**
     * Registra um novo evento no banco de dados.
     * @param name Nome do evento
     * @param author O usuário que é o dono/criador do evento
     * @returns O evento criado;
     */
    public async createOrUpdateEvent(name: string, author: User): Promise<Event> {
        const result = await this.eventRepository.save({
            name: name,
            created_by: author
        });

        return result;
    }

    /**
     * Retorna um evento por seu id.
     * @param id Id do evento.
     * @returns O evento respectivo.
     */
    public async getEvent(id: number): Promise<Event> {
        const event = await this.eventRepository.findOne({ where: { id: id } });

        if (event === null) {
            throw new Error(`Evento com id=${id} não encontrado.`);
        }

        return event;
    }
}

export const eventService = new EventService();
