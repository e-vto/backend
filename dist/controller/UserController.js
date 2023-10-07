"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const userService_1 = require("../service/userService");
const authService_1 = require("../service/authService");
const user_entity_1 = require("../model/user.entity");
const UserRegisterDto_1 = require("./dto/UserRegisterDto");
const UserLoginDto_1 = require("./dto/UserLoginDto");
const authorization_1 = require("../providers/authorization");
const mailService_1 = __importDefault(require("../service/mailService"));
let UserController = class UserController {
    /**
     * Faz o cadastro de um usuário.
     * @param user
     * @returns
     */
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObj = new user_entity_1.User();
            userObj.name = payload.name;
            userObj.email = payload.email;
            userObj.cpf = payload.cpf;
            userObj.phone = payload.phone;
            const password = payload.password;
            const response = yield userService_1.userService.registerUser(userObj, password);
            return response;
        });
    }
    /**
     * Faz o login de um usuário.
     * O request body é composto de username e senha. Se a autenticação é
     * validada, retorna um SessionToken para o usuário. Esse SessionToken deve
     * ser usado para acessar endpoints que requerem login.
     */
    login(loginRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield authService_1.authService.login(loginRequest.username, loginRequest.password);
            return {
                token: token.token_value,
                expires_at: token.expires_at.toISOString(),
            };
        });
    }
    /**
     * Retorna o usuário atual. O usuário atual é o usuário correspondente ao
     * SessionToken do request.
     */
    getCurrentUser(sessionUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return sessionUser;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userService_1.userService.getUser(id);
            if (user === null) {
                throw new routing_controllers_1.NotFoundError("Usuário não encontrado.");
            }
            return user;
        });
    }
    /**
     * Retorna o token que vai ser autenticado. // não acho uma boa ideia, tem jeitos melhores de fazer isso mas da mt preguiça
     */
    resetPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            const mailService = new mailService_1.default();
            mailService.sendEmail("insira@um.email");
            return;
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/users/register"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto_1.UserRegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)("/users/login"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Get)("/users/@me"),
    (0, routing_controllers_1.Authorized)(),
    __param(0, (0, authorization_1.WithSessionUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    (0, routing_controllers_1.Get)("/users/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
__decorate([
    (0, routing_controllers_1.Post)("/users/reset/password")
    //@Get("/users/reset/password")
    //@Authorized()
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
UserController = __decorate([
    (0, routing_controllers_1.JsonController)()
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map