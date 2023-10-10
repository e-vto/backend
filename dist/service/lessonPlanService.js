import { AppDataSource } from "../providers/dataSource.js";
import { LessonPlan } from "../model/lessonPlan.entity.js";
export class LessonPlanService {
    lessonPlanRepository;
    constructor() {
        this.lessonPlanRepository = AppDataSource.getRepository(LessonPlan);
    }
    /**
     * Retorna uma lista de lessonPlan de um determinado User.
     * @param user - Usuario logado
     * @returns Retorna uma lista de lessonPlan
     */
    async getByUser(user) {
        const lessonPlanArr = await this.lessonPlanRepository.find({ where: { user: user } });
        return lessonPlanArr;
    }
    /**
     * Retorna uma lessonPlan de um determinado User.
     * @param user - Usuario logado
     * @param lessonPlanId - Id do plano desejado
     * @returns Retorna uma lessonPlan
     */
    async getOne(user, lessonPlanId) {
        const lessonPlan = await this.lessonPlanRepository.findOne({
            where: { id: lessonPlanId, user: user },
        });
        return lessonPlan;
    }
    async savePlan(lessonPlan) {
        const savedLessonPlan = this.lessonPlanRepository.save(lessonPlan);
        return savedLessonPlan;
    }
}
