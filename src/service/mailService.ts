import Mailjet from "node-mailjet";
import { User } from "../model/user.entity";

export class MailService {
	private public_key;
	private private_key;
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
	public sendEmail(code: string, user: User) {
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

		const request = mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "jornada_nia2023@proton.me",
						Name: "vinicius",
					},
					To: [
						{
							Email: user.email,
							Name: user.name,
						},
					],
					Subject: "Recuperação de Senha.",
					TextPart: "Este email é para recuperar sua senha",
					HTMLPart:
						"<h3>Seu código de recuperação é <strong>" +
						code +
						"</strong></h3><br /> Se você não solicitou a troca de senha, não faça nada<br />May the force be with you!",
					CustomID: "nsei",
				},
			],
		});
		request
			.then(result => {
				return true;
			})
			.catch(err => {
				console.log(err.statusCode, err);
			});
	}
}

export const mailService = new MailService();
