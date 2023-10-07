import Mailjet from 'node-mailjet';
export default class MailService {
    public_key;
    private_key;
    mailJet;
    constructor() {
        const public_key = String(process.env.MJ_APIKEY_PUBLIC);
        const private_key = String(process.env.MJ_APIKEY_PRIVATE);
        this.public_key = process.env.MJ_APIKEY_PUBLIC;
        this.private_key = process.env.MJ_APIKEY_PRIVATE;
        //this.mailJet = Mailjet.apiConnect(public_key, private_key);
    }
    /**
     * sendEmail
     * @param mail - Email do destinatario
     */
    sendEmail(mail) {
        const mailjet = new Mailjet({
            apiKey: process.env.MJ_APIKEY_PUBLIC,
            apiSecret: process.env.MJ_APIKEY_PRIVATE,
            options: {
                headers: {
                    Accept: 'application/json',
                    'API-Key': this.public_key,
                    'Content-Type': 'application/json'
                }
            }
        });
        const request = mailjet
            .post("send", { 'version': 'v3.1' })
            .request({
            "Messages": [
                {
                    "From": {
                        "Email": "jornada_nia2023@proton.me",
                        "Name": "vinicius"
                    },
                    "To": [
                        {
                            "Email": "jornada_nia2023@proton.me",
                            "Name": "vinicius"
                        }
                    ],
                    "Subject": "Greetings from Mailjet.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        });
        request
            .then((result) => {
            console.log(result.body);
        })
            .catch((err) => {
            console.log(err.statusCode, err);
        });
    }
}
