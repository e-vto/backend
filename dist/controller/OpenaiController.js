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
import OpenaiPayloadDto from "./dto/OpenaiPayloadDto.js";
import { OpenIaService } from "../service/openaiService.js";
import lessonPLanDto from "./dto/LessonPlanDto.js";
import { LessonPlan } from "../model/lessonPlan.entity.js";
import { isNotEmpty } from "class-validator";
import { lessonPlanService } from "../service/lessonPlanService.js";
import { WithSessionUser } from "../providers/authorization.js";
import { User } from "../model/user.entity.js";
import { NotFoundError } from "openai";
let OpenaiController = class OpenaiController {
    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload - Objeto com as informações para a API da Openai
     * @returns planDto
     */
    async register(payload) {
        const openai = new OpenIaService();
        const reqMessage = `Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;
        try {
            const response = await openai.makeRequest(reqMessage, payload.detailAmount, payload.creativityAmout, payload.maxLenght);
            if (response.choices[0].message.function_call == null) {
                throw new Error("GPT não retornou nenhuma resposta válida");
            }
            else {
                return response.choices[0].message.function_call.arguments;
            }
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Salva um plano de aula
     * @param lessonPLanDto - Objeto com as informações do plano de aula
     * @returns true or false
     */
    async save(payload) {
        const lessonPlan = new LessonPlan();
        try {
            Object.assign(lessonPlan, payload);
            const savedPlan = lessonPlanService.savePlan(payload.userEmail, lessonPlan);
            if (isNotEmpty(savedPlan))
                return true;
        }
        catch (erro) {
            throw erro;
        }
    }
    /**
     * Pega os planos relacionados a um usuário
     * @param sessionUser - Usuário logado
     * @returns um array de plano de aula
     */
    async getUserPlans(sessionUser) {
        try {
            const lessonPlans = lessonPlanService.getByUser(sessionUser);
            if (isNotEmpty(lessonPlans)) {
                return lessonPlans;
            }
            else {
                throw NotFoundError;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async ping() {
        return "pong 🏓";
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
    Post("/plan/save"),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lessonPLanDto]),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "save", null);
__decorate([
    Get("/plans/@me"),
    __param(0, WithSessionUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
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
