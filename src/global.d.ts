declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * A porta que o servidor está rodando.
			 */
			PORT: string;

			/**
			 * A porta que o gateway está rodando.
			 */
			PORT_WS: string;
		}
	}
}

export {};
