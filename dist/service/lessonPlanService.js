import { AppDataSource } from "../providers/dataSource.js";
import { LessonPlan } from "../model/lessonPlan.entity.js";
import { userService } from "./userService.js";
import { isNotEmpty } from "class-validator";
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
    /**
     * Salva um plano de aula e o retorna.
     * @param userEmail - Email do usuario logado
     * @param lessonPlan - Objeto de plano de aula sem usuario;
     * @returns Retorna uma lessonPlan
     */
    async savePlan(userEmail, lessonPlan) {
        try {
            const user = await userService.getUserByEmail(userEmail);
            if (isNotEmpty(user)) {
                lessonPlan.user = user;
                lessonPlan.create_date = new Date();
            }
            const savedLessonPlan = this.lessonPlanRepository.save(lessonPlan);
            return savedLessonPlan;
        }
        catch (error) {
            throw error;
        }
    }
}
export const lessonPlanService = new LessonPlanService();
