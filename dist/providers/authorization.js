import { createParamDecorator } from "routing-controllers";
import { authService } from "../service/authService";
import { Logger } from "tslog";
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
export const AuthorizationChecker = async (action, roles) => {
    const req = action.request;
    const res = action.response;
    const token = req.headers.authorization;
    // Token não existe no request. O usuário não está logado.
    if (!token) {
        return false;
    }
    try {
        // Receber o usuário associado ao sessiontoken
        const user = await authService.getUserFromSessionToken(token);
        return true;
    }
    catch (error) {
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
        value: async (action) => {
            const token = action.request.headers["authorization"];
            try {
                const user = await authService.getUserFromSessionToken(token);
                console.log(user);
                return user;
            }
            catch (error) {
                return null;
            }
        },
    });
    return decorator;
};
