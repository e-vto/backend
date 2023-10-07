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
const routing_controllers_1 = require("routing-controllers");
const OpenaiPayloadDto_1 = __importDefault(require("./dto/OpenaiPayloadDto"));
const openaiService_1 = require("../service/openaiService");
let OpenaiController = class OpenaiController {
    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload - Objeto com as informações para a API da Openai
     * @returns plandto
     */
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const openai = new openaiService_1.OpenIaService();
            const reqMessage = `Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;
            const response = openai.makeRequest(reqMessage);
            yield console.log(response);
            return response;
        });
    }
    getUserPlans() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'pong 🏓';
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/plan/create")
    //@Authorized()
    ,
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OpenaiPayloadDto_1.default]),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Get)("/plan/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "getUserPlans", null);
__decorate([
    (0, routing_controllers_1.Get)("/ping"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpenaiController.prototype, "ping", null);
OpenaiController = __decorate([
    (0, routing_controllers_1.JsonController)()
], OpenaiController);
exports.default = OpenaiController;
//# sourceMappingURL=OpenaiController.js.map