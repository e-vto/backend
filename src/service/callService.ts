import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../providers/dataSource";
import { Logger } from "tslog";
import { User } from "../model/user.entity";
import { Call } from "../model/call.entity";
import { gatewayService } from "./gatewayService";

const logger = new Logger({ name: "CallService" });

export class CallService {
	private callRepository: Repository<Call>;

	constructor() {
		this.callRepository = AppDataSource.getRepository(Call);
	}

	/**
	 * Registra um novo chamado. Todos os clientes conectados são notificados.
	 */
	public async createCall(
		authorId: number,
		eventId: number,
		sectorId: number,
		content: string
	): Promise<Call> {
		let call = this.callRepository.create({
			authorId: authorId,
			eventId: eventId,
			sectorId: sectorId,
			content: content,
			creation_datetime: new Date(),
			resolved: false,
		});

		call = await this.callRepository.save(call);

		gatewayService.notifyNewCall(call);

		return call;
	}

	/**
	 * Retorna um evento por seu id.
	 * @param id Id do evento.
	 * @returns O evento respectivo.
	 */
	public async getCallsForEvent(eventId: number): Promise<Call[]> {
		const events = await this.callRepository.find({ where: { eventId: eventId } });

		return events;
	}
}

export const callService = new CallService();
