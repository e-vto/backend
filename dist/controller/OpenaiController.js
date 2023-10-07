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
import { Body, Get, JsonController, Post } from "routing-controllers";
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto";
import { OpenIaService } from "../service/openaiService";
let OpenaiController = class OpenaiController {
    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload - Objeto com as informações para a API da Openai
     * @returns plandto
     */
    //@Authorized()
    async register(payload) {
        const openai = new OpenIaService();
        const reqMessage = `Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;
        const response = openai.makeRequest(reqMessage);
        await console.log(response);
        return response;
    }
    async getUserPlans() { }
    async ping() {
        return 'pong 🏓';
    }
};
__decorate([
    Post("/plan/create")
    //@Authorized()
    ,
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OpenaiPayloadDto]),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "register", null);
__decorate([
    Get("/plan/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "getUserPlans", null);
__decorate([
    Get("/ping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "ping", null);
OpenaiController = __decorate([
    JsonController()
], OpenaiController);
export default OpenaiController;
