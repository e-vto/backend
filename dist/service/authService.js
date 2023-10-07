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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const sessionToken_entity_1 = require("../model/sessionToken.entity");
const auth_entity_1 = require("../model/auth.entity");
const dataSource_1 = require("../providers/dataSource");
const tslog_1 = require("tslog");
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const logger = new tslog_1.Logger({ name: "authService" });
class AuthService {
    constructor() {
        this.authRepository = dataSource_1.AppDataSource.getRepository(auth_entity_1.Auth);
        this.sessionTokenRepository = dataSource_1.AppDataSource.getRepository(sessionToken_entity_1.SessionToken);
    }
    /**
     * Retorna o usuário associado a um token de login.
     */
    getUserFromSessionToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionToken = yield this.sessionTokenRepository.findOne({
                where: { token_value: token },
            });
            // Se o token não existir, ou se o token expirou, é inválido.
            if (sessionToken === null || sessionToken.expires_at <= new Date()) {
                throw new Error("Token de sessão inválido.");
            }
            return sessionToken.user;
        });
    }
    login(username, password_plaintext) {
        return __awaiter(this, void 0, void 0, function* () {
            // Por hora, o username é o CPF
            const auth = yield this.authRepository.findOne({
                relations: ["user"],
                where: { user: { cpf: username } },
            });
            if (auth === null) {
                throw new Error("Informações de autenticação não cadastradas.");
            }
            const given_password = this.encodePassword(password_plaintext, auth.password_salt);
            const stored_password = auth.password_hashed;
            if (given_password !== stored_password) {
                throw new Error("A senha está incorreta.");
            }
            // Se chegamos aqui, o usuário estará autenticado.
            // 1. Remover/invalidar os tokens de acesso anteriores, de logins velhos
            // 2. Criar um novo token de acesso
            logger.debug("Usuário autenticado:", auth.user.cpf);
            // Remover tokens antigos para o usuário
            yield this.sessionTokenRepository.delete({ user: { id: auth.user.id } });
            // Criar um novo token
            const token = this.generateToken(auth.user);
            // Guardar o token de autenticação
            yield this.sessionTokenRepository.save(token);
            return token;
        });
    }
    /**
     * Atualiza/registra as informações de login do usuário.
     * @param auth - O objeto de auth a ser salvo.
     * @returns Uma Promise que resolve com as informações de login criadas.
     */
    setAuthInfoForUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remover informações antigas de auth do usuário
            yield this.authRepository.delete({ user: { id: user.id } });
            const auth = new auth_entity_1.Auth();
            auth.user = user;
            auth.password_salt = this.generateSalt();
            auth.password_hashed = this.encodePassword(password, auth.password_salt);
            return yield this.authRepository.save(auth);
        });
    }
    /**
     * Gera um token de sessão para o usuário dado.
     * @param user O usuário em questão.
     * @returns Um token de sessão para o usuário dado.
     */
    generateToken(user) {
        const base64 = (data) => Buffer.from(data).toString("base64");
        const randomData = () => crypto_1.default.randomBytes(16).toString("base64");
        const token = new sessionToken_entity_1.SessionToken();
        token.user = user;
        token.token_value = base64(user.id.toString()) + ":" + randomData();
        token.created_at = (0, dayjs_1.default)().toDate();
        token.expires_at = (0, dayjs_1.default)().add(7, "days").toDate();
        return token;
    }
    /**
     * Cria uma hash SHA-256 da senha do usuário com a salt dada.
     * Essa hash deve ser guardada no banco como a senha do usuário.
     * @param plaintext A senha do usuário.
     * @param salt A salt da senha do usuário.
     * @returns A hash criada.
     */
    encodePassword(plaintext, salt) {
        return crypto_1.default
            .createHash("sha256")
            .update(plaintext + salt)
            .digest()
            .toString("base64");
    }
    /**
     * Gera o salt da senha. É um valor aleatório único para cada usuário, que deve ser guardado em plaintext no banco de dados.
     * Previne ataques de "rainbow table"
     * @returns Uma string aleatória.
     */
    generateSalt() {
        return crypto_1.default.randomBytes(16).toString("base64");
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map