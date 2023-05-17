import { Call } from "../model/call.entity";
import { GatewayServer } from "../gateway";

export class GatewayService {
	/**
	 * Envia um chamado para todos os clientes conectados ao gateway.
	 */
	public notifyNewCall(call: Call) {
		GatewayServer.emit("call_new", call);
	}
}

export const gatewayService = new GatewayService();
