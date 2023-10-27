var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber } from "class-validator";
export default class lessonPLanDto {
    /**
     * Ementa da matéria
     */
    syllabus;
    userEmail;
    /**
     * Conteúdo formativo da aula
     */
    content;
    /**
     * Quantidade de aulas disponíveis
     */
    classesQuantity;
    /**
     * Nível de detalhamento
     */
    detail;
    /**
     * Nível de criatividade (temperature)
     */
    creativity; // esse tipo deve estar errado
    /**
     * Tamanho em quantidade de palavras
     */
    size;
    /**
     * Nível de detalhamento
     */
    lesson_type;
    /**
     * Prompt utilizada para gerar
     */
    text;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], lessonPLanDto.prototype, "syllabus", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], lessonPLanDto.prototype, "userEmail", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], lessonPLanDto.prototype, "content", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], lessonPLanDto.prototype, "classesQuantity", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], lessonPLanDto.prototype, "detail", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], lessonPLanDto.prototype, "creativity", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], lessonPLanDto.prototype, "size", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], lessonPLanDto.prototype, "lesson_type", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], lessonPLanDto.prototype, "text", void 0);
