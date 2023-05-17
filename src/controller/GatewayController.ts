import {
	OnConnect,
	SocketController,
	ConnectedSocket,
	OnDisconnect,
	SocketIO,
} from "socket-controllers";
import { Service } from "typedi";
import { Logger } from "tslog";
import type { Server as IO, Socket } from "socket.io";

const logger = new Logger({ name: "gateway" });

@SocketController()
@Service()
export class GatewayController {
	public connectedClients: number = 0;

	/**
	 * Chamado quando um cliente faz a conexão ao gateway.
	 *
	 * @param socket - O objeto Socket representando o cliente conectado.
	 * @param io - O objeto IO representando a instância do Socket.IO.
	 */
	@OnConnect()
	public connection(@ConnectedSocket() socket: Socket, @SocketIO() io: IO) {
		this.connectedClients++;

		logger.info("Cliente conectado.", this.connectedClients, "clientes totais.");

		socket.emit("hello", "world");
	}

	/**
	 * Chamado quando um cliente desconecta do gateway.
	 *
	 * @param socket - O objeto Socket representando o cliente desconectado.
	 * @param io - O objeto IO representando a instância do Socket.IO.
	 */
	@OnDisconnect()
	disconnect(@ConnectedSocket() socket: Socket, @SocketIO() io: IO) {
		this.connectedClients--;

		logger.info("Cliente desconectado.", this.connectedClients, "clientes totais.");
	}
}
