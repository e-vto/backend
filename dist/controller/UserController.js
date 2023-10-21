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
import { Param, Body, Get, Post, JsonController, NotFoundError, Authorized, } from "routing-controllers";
import { userService } from "../service/userService.js";
import { authService } from "../service/authService.js";
import { User } from "../model/user.entity.js";
import { UserRegisterDto } from "./dto/UserRegisterDto.js";
import { UserLoginDto } from "./dto/UserLoginDto.js";
import { WithSessionUser } from "../providers/authorization.js";
let UserController = class UserController {
    /**
     * Faz o cadastro de um usuário.
     * @param user
     * @returns
     */
    async register(payload) {
        const userObj = new User();
        userObj.name = payload.name;
        userObj.email = payload.email;
        userObj.cpf = payload.cpf;
        userObj.phone = payload.phone;
        const password = payload.password;
        const response = await userService.registerUser(userObj, password);
        return response;
    }
    /**
     * Faz o login de um usuário.
     * O request body é composto de username e senha. Se a autenticação é
     * validada, retorna um SessionToken para o usuário. Esse SessionToken deve
     * ser usado para acessar endpoints que requerem login.
     */
    async login(loginRequest) {
        const token = await authService.login(loginRequest.username, loginRequest.password);
        return {
            token: token.token_value,
            expires_at: token.expires_at.toISOString(),
        };
    }
    /**
     * Retorna o usuário atual. O usuário atual é o usuário correspondente ao
     * SessionToken do request.
     */
    async getCurrentUser(sessionUser) {
        return sessionUser;
    }
    async getOne(id) {
        const user = await userService.getUser(id);
        if (user === null) {
            throw new NotFoundError("Usuário não encontrado.");
        }
        return user;
    }
};
__decorate([
    Post("/users/register"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRegisterDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    Post("/users/login"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    Get("/users/@me"),
    Authorized(),
    __param(0, WithSessionUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    Get("/users/:id"),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOne", null);
UserController = __decorate([
    JsonController()
], UserController);
export { UserController };
