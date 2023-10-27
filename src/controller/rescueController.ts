import {
	Param,
	Body,
	Get,
	Post,
	JsonController,
	NotFoundError,
	Authorized,
    OnNull,
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
        try{
            // verifica se o email pertence a um usuário
            const user = await userService.getUserByEmail(payload.email);

            if(isNotEmpty(user)){
                // define o código e envia o email
                const code = await rescueCodeService.defineCode(user!);
                const isSend = await mailService.sendEmail(code!, user!);

                if(isSend) return true;
            }
        }catch(error){
            throw error;
        }
        
    }

    /**
     * 
     */
    @Post("/rescue/test")
    @OnNull(418)
    async testRescue(@Body() payload: {email: string, code: string}){
        try{
            // verifica se o email pertence a um usuário
            const user = await userService.getUserByEmail(payload.email);
            
            if(isNotEmpty(user)){
                // verifica se o código está certo e pertence ao usuário
                const isRightCode = await rescueCodeService.validateCode(user!, payload.code);
                
                if(isRightCode){
                    return true;
                }else{
                    return null;
                }
            }
            // se chegou aqui significa que o usuário não pediu para trocar de senha
            return null;
        }catch(error){
            console.log(error);

            return null;
        }
    }

    /**
     * 
     */
    @Post("/rescue/confirm")
    @OnNull(418)
    async confirmRescue(@Body() payload: {code: string, newPassword: string}, @WithSessionUser() sessionUser: User){   
        try{
            if(isNotEmpty(sessionUser)){
                // verifica se o código está certo e pertence ao usuário
                const isRightCode = await rescueCodeService.validateCode(sessionUser!, payload.code);
                
                if(isRightCode){
                    const changed = await userService.changePassword(sessionUser, payload.newPassword);
    
                    if(changed){
                        return {success: true};
                    }
                }
            }
        }catch(error){
            console.log(error);
            
            return null;
        }
    }

}