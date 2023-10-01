import { Repository } from "typeorm";
import { AppDataSource } from "../providers/dataSource";
import { LessonPlan } from "../model/lessonPlan.entity";
import { User } from "../model/user.entity";

export class LessonPlanService {
	private lessonPlanRepository: Repository<LessonPlan>;

	constructor() {
		this.lessonPlanRepository = AppDataSource.getRepository(LessonPlan);
	}

	/**
	 * Retorna uma lista de lessonPlan de um determinado User.
	 * @param user - Usuario logado
	 * @returns Retorna uma lista de lessonPlan
	 */
	public async getByUser(user: User): Promise<Array<LessonPlan> | null> {
		const lessonPlanArr = await this.lessonPlanRepository.find({ where: { user: user } });

		return lessonPlanArr;
	}

	/**
	 * Retorna uma lessonPlan de um determinado User.
	 * @param user - Usuario logado
	 * @param lessonPlanId - Id do plano desejado
	 * @returns Retorna uma lessonPlan
	 */
	public async getOne(user: User, lessonPlanId: number): Promise<LessonPlan | null> {
		const lessonPlan = await this.lessonPlanRepository.findOne({
			where: { id: lessonPlanId, user: user },
		});

		return lessonPlan;
	}

    public async savePlan(lessonPlan: LessonPlan): Promise<LessonPlan> {

        const savedLessonPlan = this.lessonPlanRepository.save(lessonPlan);

        return savedLessonPlan
    }
}
