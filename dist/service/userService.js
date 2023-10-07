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
exports.userService = exports.UserService = void 0;
const user_entity_1 = require("../model/user.entity");
const dataSource_1 = require("../providers/dataSource");
const authService_1 = require("./authService");
class UserService {
    constructor() {
        this.userRepository = dataSource_1.AppDataSource.getRepository(user_entity_1.User);
    }
    /**
     * Obtém um usuário pelo seu ID.
     * @param id O ID do usuário a ser buscado.
     * @returns Uma Promise que resolve para um objeto do tipo User se o usuário for encontrado, ou null se não for encontrado.
     */
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: id } });
            return user;
        });
    }
    /**
     * Registra um novo usuário.
     * @param user - O objeto de usuário a ser salvo.
     * @param password - A senha do usuário encriptada.
     * @returns Uma Promise que resolve para o usuário salvo.
     */
    registerUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = yield dataSource_1.AppDataSource.createQueryRunner();
            yield queryRunner.startTransaction();
            try {
                // Insere o usuário no banco de dados
                const insertedUser = yield this.userRepository.save(user);
                // Define a senha para o usuário
                yield authService_1.authService.setAuthInfoForUser(insertedUser, password);
                yield queryRunner.release();
                return insertedUser;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                yield queryRunner.release();
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map