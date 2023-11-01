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
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let OpenaiController = class OpenaiController {
    /**
     * Envia a requisição do plano para a openai.
     * @param openaiPayload - Objeto com as informações para a API da Openai
     * @returns planDto
     */
    async register(payload) {
        /*await timeout(100);
        return{
            "planArr": [
              {
                "theme": "Introdução a Análise e Projeto Orientado a Objetos",
                "objectives": [
                  "Compreender os conceitos fundamentais da análise e projeto orientados a objetos",
                  "Conhecer a importância da análise e projeto orientados a objetos no desenvolvimento de software",
                  "Identificar os principais elementos utilizados na análise e projeto orientados a objetos"
                ],
                "duration": "1 encontro",
                "content": [
                  "Introdução aos conceitos de análise e projeto orientados a objetos",
                  "Princípios básicos da orientação a objetos",
                  "Diferenças entre a abordagem tradicional e a orientação a objetos",
                  "Elementos fundamentais da análise e projeto orientados a objetos"
                ]
              },
              {
                "theme": "Casos de Uso",
                "objectives": [
                  "Entender o conceito de casos de uso",
                  "Saber identificar e descrever casos de uso",
                  "Construir diagramas de casos de uso utilizando a linguagem UML"
                ],
                "duration": "2 encontros",
                "content": [
                  "Conceito de casos de uso",
                  "Identificação e descrição de casos de uso",
                  "Diagramas de casos de uso na linguagem UML",
                  "Exercícios práticos de criação de diagramas de casos de uso"
                ]
              },
              {
                "theme": "Detalhamento do caso de uso",
                "objectives": [
                  "Aprender a especificar detalhadamente um caso de uso",
                  "Compreender a importância do detalhamento do caso de uso na fase de desenvolvimento de software",
                  "Construir diagramas de sequência para representar o fluxo de operações do caso de uso"
                ],
                "duration": "3 encontros",
                "content": [
                  "Especificação detalhada de um caso de uso",
                  "Identificação dos atores envolvidos",
                  "Descrição do fluxo de operações",
                  "Construção de diagramas de sequência na linguagem UML"
                ]
              },
              {
                "theme": "UML - Unified Modeling Language e seus diagramas",
                "objectives": [
                  "Conhecer a linguagem de modelagem unificada (UML)",
                  "Entender os principais diagramas utilizados na UML",
                  "Aplicar os diagramas da UML na análise e projeto de sistemas orientados a objetos"
                ],
                "duration": "4 encontros",
                "content": [
                  "Introdução à UML",
                  "Diagrama de classes",
                  "Diagrama de objetos",
                  "Diagrama de sequência",
                  "Diagrama de atividades",
                  "Diagrama de estados",
                  "Diagrama de componentes",
                  "Exercícios práticos de aplicação dos diagramas da UML"
                ]
              },
              {
                "theme": "Análise Orientada a Objetos",
                "objectives": [
                  "Aplicar os conceitos aprendidos na análise orientada a objetos",
                  "Utilizar as técnicas de análise orientada a objetos na modelagem de sistemas",
                  "Estruturar o modelo estático e dinâmico de um sistema orientado a objetos"
                ],
                "duration": "10 encontros",
                "content": [
                  "Conceitos da análise orientada a objetos",
                  "Identificação e especificação de classes",
                  "Relacionamentos entre classes",
                  "Herança e polimorfismo",
                  "Modelagem do sistema estático",
                  "Modelagem do sistema dinâmico",
                  "Exercícios práticos de análise orientada a objetos"
                ]
              }
            ]
          };*/
        const openai = new OpenIaService();
        const reqMessage = `Ementa: ${payload.syllabus} \n
			Conteudos Formativos: ${payload.content} \n
			Serão dividos em ${payload.classesQuantity} encontros`;
        try {
            const response = await openai.makeRequest(reqMessage, payload.detailAmount, payload.creativityAmout, payload.maxLenght);
            console.log(response);
            if (response.choices[0].message.function_call == null) {
                throw new Error("GPT não retornou nenhuma resposta válida");
            }
            else {
                return JSON.parse(response.choices[0].message.function_call.arguments);
            }
        }
        catch (error) {
            console.error(error);
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
