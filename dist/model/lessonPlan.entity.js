var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";
let LessonPlan = class LessonPlan {
    /**
     * Identificador único do plano.
     */
    id;
    /**
     * O usuário referido
     */
    user;
    /**
     * Ementa da matéria
     */
    syllabus;
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
     * Tipo de aula
     */
    lesson_type;
    /**
     * texto do plano de aula
     */
    text;
    /**
     * Data de criação
     */
    create_date;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], LessonPlan.prototype, "id", void 0);
__decorate([
    OneToOne(() => User, user => user.id, { eager: true }),
    JoinColumn(),
    __metadata("design:type", User)
], LessonPlan.prototype, "user", void 0);
__decorate([
    Column({ comment: "EMENTA" }),
    __metadata("design:type", String)
], LessonPlan.prototype, "syllabus", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], LessonPlan.prototype, "content", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], LessonPlan.prototype, "classesQuantity", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], LessonPlan.prototype, "detail", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], LessonPlan.prototype, "creativity", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], LessonPlan.prototype, "size", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], LessonPlan.prototype, "lesson_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], LessonPlan.prototype, "text", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], LessonPlan.prototype, "create_date", void 0);
LessonPlan = __decorate([
    Entity()
], LessonPlan);
export { LessonPlan };
