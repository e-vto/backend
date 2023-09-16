import { Action, createParamDecorator } from "routing-controllers";
import type { AuthorizationChecker as C } from "routing-controllers/types/AuthorizationChecker";
import type { Request, Response } from "express";
import { authService } from "../service/authService";
import { Logger } from "tslog";
import { User } from "../model/user.entity";

const logger = new Logger({ name: "AuthorizationChecler" });

/**
 * O decorador @Authorized é usado para definir a autorização de acesso a uma
 * determinado endpoint ou método de um controlador. Ele permite restringir o
 * acesso com base em permissões ou regras específicas. Ao aplicar o decorador
 * @Authorized a uma rota ou método, a biblioteca routing-controllers verifica
 * se o usuário atual possui as permissões necessárias antes de permitir o
 * acesso à rota.
 *
 * A função authorizationChecker é usada em conjunto com o decorador para
 * implementar uma lógica de verificação de autorização personalizada. Essa
 * função é passada como um parâmetro para o método createExpressServer durante
 * a configuração do nosso servidor, no arquivo index.ts.
 *
 * https://github.com/typestack/routing-controllers#using-authorization-features
 *
 * Essa implementação integra com nosso sistema de SessionToken.
 */
export const AuthorizationChecker: C = async (action: Action, roles: any[]) => {
	const req: Request = action.request;
	const res: Response = action.response;

	const token = req.headers.authorization;

	// Token não existe no request. O usuário não está logado.
	if (!token) {
		return false;
	}

	try {
		// Receber o usuário associado ao sessiontoken
		const user = await authService.getUserFromSessionToken(token);

		return true;
	} catch (error) {
		logger.warn("Request forneceu um token de sessão inválido.", token);
		logger.warn(error);
		return false;
	}
};

/**
 * Implementação do decorador @WithSessionUser que resolve para o usuário
 * correspondente ao token atual.
 *
 * @returns {User | null}
 */
export const WithSessionUser = () => {
	const decorator = createParamDecorator({
		required: true,
		value: async action => {
			const token = action.request.headers["authorization"];

			try {
				const user = await authService.getUserFromSessionToken(token);

				console.log(user);

				return user;
			} catch (error) {
				return null;
			}
		},
	});

	return decorator as unknown as any;
};
