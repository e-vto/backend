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
import { Body, Post, JsonController, } from "routing-controllers";
import { userService } from "../service/userService.js";
import { mailService } from "../service/mailService.js";
import { isNotEmpty } from "class-validator";
import { rescueCodeService } from "../service/rescueCodeService.js";
let RescueController = class RescueController {
    /**
     * Iniciar o resgate para o reset de senha
     * @param payload é um json contendo o email do usuário
     */
    async startRescue(payload) {
        try {
            // verifica se o email pertence a um usuário
            const user = await userService.getUserByEmail(payload.email);
            if (isNotEmpty(user)) {
                // define o código e envia o email
                const code = await rescueCodeService.defineCode(user);
                const isSend = await mailService.sendEmail(code, user);
                if (isSend)
                    return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    /**
     *
     */
    async testRescue(payload) {
        // verifica se o email pertence a um usuário
        const user = await userService.getUserByEmail(payload.email);
        if (isNotEmpty(user)) {
            // verifica se o código está certo e pertence ao usuário
            const isRightCode = await rescueCodeService.validateCode(user, payload.code);
            if (isRightCode) {
                return true;
            }
            else {
                return false;
            }
        }
        // se chegou aqui significa que o usuário não pediu para trocar de senha
        return false;
    }
    /**
     *
     */
    async confirmRescue(payload) {
    }
};
__decorate([
    Post("/rescue/start"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RescueController.prototype, "startRescue", null);
__decorate([
    Post("/rescue/test"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RescueController.prototype, "testRescue", null);
__decorate([
    Post("/rescue/confirm"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RescueController.prototype, "confirmRescue", null);
RescueController = __decorate([
    JsonController()
], RescueController);
export { RescueController };
