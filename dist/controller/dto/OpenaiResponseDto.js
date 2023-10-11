var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsArray } from "class-validator";
export default class OpenaiResponseDto {
    lessonPlanArray;
}
__decorate([
    IsArray(),
    __metadata("design:type", Array)
], OpenaiResponseDto.prototype, "lessonPlanArray", void 0);
class classPlan {
    /**
    * Tema da aula vindo do GPT
    */
    theme;
    /**
    * Objetivos da aula vindo do GPT
    */
    objectives;
    /**
    * Duração da aula vindo do GPT
    */
    duration;
    /**
    * Método da aula vindo do GPT
    */
    method;
    /**
    * Conteúdo da aula vindo do GPT
    */
    content;
}
__decorate([
    IsArray(),
    __metadata("design:type", String)
], classPlan.prototype, "theme", void 0);
__decorate([
    IsArray(),
    __metadata("design:type", String)
], classPlan.prototype, "objectives", void 0);
__decorate([
    IsArray(),
    __metadata("design:type", String)
], classPlan.prototype, "duration", void 0);
__decorate([
    IsArray(),
    __metadata("design:type", String)
], classPlan.prototype, "method", void 0);
__decorate([
    IsArray(),
    __metadata("design:type", String)
], classPlan.prototype, "content", void 0);
