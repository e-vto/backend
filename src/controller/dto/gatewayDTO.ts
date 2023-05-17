import type { Call } from "../../model/call.entity";

/**
 * Define os tipos usados para todas as mensagens enviadas no sentido
 * gateway >>> socket.
 *
 * Cada campo é uma função. O nome da função é passado como o primeiro
 * parâmetro em `socket.emit()`, e os parâmetros são os parâmetros adicionais.
 *
 * Explicação:
 * https://socket.io/docs/v4/typescript/#types-for-the-server
 */
export interface GatewayEventsToClient {
	/**
	 * Evento de quando um chamado é criado.
	 */
	call_new: (call: Call) => void;

	/**
	 * Quando qualquer campo de um chamado existente for alterado. Por exemplo,
	 * se um chamado for marcado como resolvido, esse evento é enviado.
	 */
	call_update: (call: Call) => void;
}
