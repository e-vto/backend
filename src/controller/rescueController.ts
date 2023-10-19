import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
} from "routing-controllers";
import { userService } from "../service/userService.js";
import { authService } from "../service/authService.js";
import { User } from "../model/user.entity.js";
import { WithSessionUser } from "../providers/authorization.js";
import { mailService } from "../service/mailService.js";
import { isNotEmpty } from "class-validator";
import { rescueCodeService } from "../service/rescueCodeService.js";

@JsonController()
export class RescueController {

    /** 
     * Iniciar o resgate para o reset de senha
     * @param payload é um json contendo o email do usuário
     */
    @Post("/rescue/start")
    async startRescue(@Body() payload: {email: string}){

        // verifica se o email pertence a um usuário
        const user = await userService.getUserByEmail(payload.email);

        if(isNotEmpty(user)){
            const code = await rescueCodeService.defineCode(user!);
            mailService.sendEmail(code!, user!);
        }
    }

    /**
     * 
     */
    @Post("/rescue/test")
    async testRescue(@Body() payload: {code: string}){

    }

    /**
     * 
     */
    @Post("/rescue/confirm")
    async confirmRescue(@Body() payload: {code: string, newPassword: string}){

    }

}