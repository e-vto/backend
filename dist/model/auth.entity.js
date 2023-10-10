var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";
import { User } from "./user.entity.js";
let Auth = class Auth {
    id;
    /**
     * O usuário referido
     */
    user;
    /**
     * A senha do usuário
     */
    password_hashed;
    /**
     * A salt da senha, em plain-text.
     * Ela deve ser concatenada após a senha, para obter o valor que deve ser guardado no banco.
     * (algo como: sha256(plaintext_password + password_salt)
     * O valor é único para cada usuário.
     */
    password_salt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Auth.prototype, "id", void 0);
__decorate([
    OneToOne(() => User, user => user.id, { eager: true }),
    JoinColumn(),
    __metadata("design:type", User)
], Auth.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Auth.prototype, "password_hashed", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Auth.prototype, "password_salt", void 0);
Auth = __decorate([
    Entity()
], Auth);
export { Auth };
