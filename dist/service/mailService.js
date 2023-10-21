import Mailjet from "node-mailjet";
import { isNotEmpty } from "class-validator";
export class MailService {
    public_key;
    private_key;
    //private mailJet;
    constructor() {
        const public_key = String(process.env.MJ_APIKEY_PUBLIC);
        const private_key = String(process.env.MJ_APIKEY_PRIVATE);
        this.public_key = String(process.env.MJ_APIKEY_PUBLIC);
        this.private_key = String(process.env.MJ_APIKEY_PRIVATE);
        //this.mailJet = Mailjet.apiConnect(public_key, private_key);
    }
    /**
     * sendEmail
     * @param mail - Email do destinatario
     */
    async sendEmail(code, user) {
        const mailjet = new Mailjet({
            apiKey: process.env.MJ_APIKEY_PUBLIC,
            apiSecret: process.env.MJ_APIKEY_PRIVATE,
            options: {
                headers: {
                    Accept: "application/json",
                    "API-Key": this.public_key,
                    "Content-Type": "application/json",
                },
            },
        });
        try {
            const request = await mailjet.post("send", { version: "v3.1" }).request({
                Messages: [
                    {
                        From: {
                            Email: "jornada_nia2023@proton.me",
                            Name: "Nia",
                        },
                        To: [
                            {
                                Email: user.email,
                                Name: user.name,
                            },
                        ],
                        Subject: "Recuperação de Senha.",
                        TextPart: "Este email é para recuperar sua senha",
                        HTMLPart: "<h3>Seu código de recuperação é <strong>" +
                            code +
                            "</strong></h3><br /> Se você não solicitou a troca de senha, não faça nada<br />May the force be with you! </br> <strong>não responda esse email</strong>",
                        CustomID: "nsei",
                    },
                ],
            });
            if (isNotEmpty(request)) {
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
export const mailService = new MailService();
