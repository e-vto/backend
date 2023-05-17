import { Call } from "../model/call.entity";
import { GatewayServer } from "../gateway";

export class GatewayService {
	/**
	 * Envia um chamado para todos os clientes conectados ao gateway.
	 */
	public createCall(call: Call) {
		// ... GatewayServer.emit("call_new", {}); ...
	}
}

export const gatewayService = new GatewayService();
