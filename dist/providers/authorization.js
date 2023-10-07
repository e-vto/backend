"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSessionUser = exports.AuthorizationChecker = void 0;
const routing_controllers_1 = require("routing-controllers");
const authService_1 = require("../service/authService");
const tslog_1 = require("tslog");
const logger = new tslog_1.Logger({ name: "AuthorizationChecler" });
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
const AuthorizationChecker = (action, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const req = action.request;
    const res = action.response;
    const token = req.headers.authorization;
    // Token não existe no request. O usuário não está logado.
    if (!token) {
        return false;
    }
    try {
        // Receber o usuário associado ao sessiontoken
        const user = yield authService_1.authService.getUserFromSessionToken(token);
        return true;
    }
    catch (error) {
        logger.warn("Request forneceu um token de sessão inválido.", token);
        logger.warn(error);
        return false;
    }
});
exports.AuthorizationChecker = AuthorizationChecker;
/**
 * Implementação do decorador @WithSessionUser que resolve para o usuário
 * correspondente ao token atual.
 *
 * @returns {User | null}
 */
const WithSessionUser = () => {
    const decorator = (0, routing_controllers_1.createParamDecorator)({
        required: true,
        value: (action) => __awaiter(void 0, void 0, void 0, function* () {
            const token = action.request.headers["authorization"];
            try {
                const user = yield authService_1.authService.getUserFromSessionToken(token);
                console.log(user);
                return user;
            }
            catch (error) {
                return null;
            }
        }),
    });
    return decorator;
};
exports.WithSessionUser = WithSessionUser;
//# sourceMappingURL=authorization.js.map