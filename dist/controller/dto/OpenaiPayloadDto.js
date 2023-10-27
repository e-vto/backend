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
export default class OpenaiPayloadDto {
    // ementa
    syllabus;
    content;
    classesQuantity;
    detailAmount;
    creativityAmout;
    maxLenght;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], OpenaiPayloadDto.prototype, "syllabus", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], OpenaiPayloadDto.prototype, "content", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], OpenaiPayloadDto.prototype, "classesQuantity", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], OpenaiPayloadDto.prototype, "detailAmount", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], OpenaiPayloadDto.prototype, "creativityAmout", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], OpenaiPayloadDto.prototype, "maxLenght", void 0);
