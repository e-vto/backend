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
let RescueCode = class RescueCode {
    /**
     * Identificador único do token.
     */
    id;
    /**
     * Códico para ser digitado.
     */
    code;
    /**
     * Usuário associado ao código digitado.
     */
    user;
    /**
     * Data de criação do código.
     */
    created_at;
    /**
     * Data de expiração do código.
     */
    expires_at;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RescueCode.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], RescueCode.prototype, "code", void 0);
__decorate([
    OneToOne(() => User, { eager: true }),
    JoinColumn(),
    __metadata("design:type", User)
], RescueCode.prototype, "user", void 0);
RescueCode = __decorate([
    Entity()
], RescueCode);
export { RescueCode };
