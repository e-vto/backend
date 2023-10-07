"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonPlanService = void 0;
const dataSource_1 = require("../providers/dataSource");
const lessonPlan_entity_1 = require("../model/lessonPlan.entity");
class LessonPlanService {
    constructor() {
        this.lessonPlanRepository = dataSource_1.AppDataSource.getRepository(lessonPlan_entity_1.LessonPlan);
    }
    /**
     * Retorna uma lista de lessonPlan de um determinado User.
     * @param user - Usuario logado
     * @returns Retorna uma lista de lessonPlan
     */
    getByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const lessonPlanArr = yield this.lessonPlanRepository.find({ where: { user: user } });
            return lessonPlanArr;
        });
    }
    /**
     * Retorna uma lessonPlan de um determinado User.
     * @param user - Usuario logado
     * @param lessonPlanId - Id do plano desejado
     * @returns Retorna uma lessonPlan
     */
    getOne(user, lessonPlanId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lessonPlan = yield this.lessonPlanRepository.findOne({
                where: { id: lessonPlanId, user: user },
            });
            return lessonPlan;
        });
    }
    savePlan(lessonPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedLessonPlan = this.lessonPlanRepository.save(lessonPlan);
            return savedLessonPlan;
        });
    }
}
exports.LessonPlanService = LessonPlanService;
//# sourceMappingURL=lessonPlanService.js.map