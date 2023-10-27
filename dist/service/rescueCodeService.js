import { RescueCode } from "../model/rescueCode.entity.js";
import { AppDataSource } from "../providers/dataSource.js";
export class RescueCodeService {
    rescueCodeRepository;
    constructor() {
        this.rescueCodeRepository = AppDataSource.getRepository(RescueCode);
    }
    /**
    * Definir o Código e salvar no Banco
    * @param user usuário cadastrado na aplicação
    * @returns código salvo no banco de dados
    */
    async defineCode(user) {
        const code = (Number(Date.now()) * Math.floor((Math.random() * 100) + 1)).toString().slice(-6);
        let rescueCode = await this.rescueCodeRepository.findOne({ where: { user: user } });
        if (rescueCode == null) {
            rescueCode = new RescueCode();
            rescueCode.user = user;
        }
        rescueCode.code = code;
        rescueCode.created_at = new Date();
        rescueCode.expires_at = new Date(rescueCode.created_at.getDate() + 1);
        try {
            const saved = await this.rescueCodeRepository.save(rescueCode);
            return saved.code;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Valida o código vindo do front
     * @param code
     * @returns verdadeiro se válido e falso se inválido
     */
    async validateCode(user, code) {
        try {
            const find = await this.rescueCodeRepository.findOne({ where: { user: user } });
            if (find == null) {
                //throw new Error("erro user not found");
                return false;
            }
            if (find.code == code) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
export const rescueCodeService = new RescueCodeService();
