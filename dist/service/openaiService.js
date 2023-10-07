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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenIaService = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenIaService {
    constructor() {
        const config = {
            apiKey: process.env.OPENAPI_TOKEN,
        };
        this.openIAApi = new openai_1.default(config);
    }
    /**
     * Envia para a API da openIA o texto desejado.
     * @param text texto a ser enviado.
     * @returns retorna a resposta obtida pela API
     */
    makeRequest(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const functions = this.defineApiReturn();
            const params = {
                //model: "gpt-3.5-turbo",
                model: "gpt-3.5-turbo-16k",
                messages: [
                    {
                        role: "system",
                        content: "Você fará o papel de um professor universitário que neste momento precisa elaborar um plano de aula  a partir da ementa e conteudos",
                    },
                    { role: "user", content: text },
                ],
                functions: [functions],
                function_call: { name: "returnResponse" },
                max_tokens: 16097,
                temperature: 0.5, // between 0 and 2
                //frequency_penalty: 1,
            };
            console.log(params);
            const response = this.openIAApi.chat.completions.create(params);
            const test = (yield response).object;
            yield console.log(test);
            return response;
        });
    }
    /**
     * Retorna a estruturação necessária para o retorno da API.
     * @returns retorna a estrutura para a API
     */
    defineApiReturn() {
        const params = {
            type: "object",
            properties: {
                planArr: {
                    type: "array",
                    descripton: "lista de objetos dos dias de plano de aula",
                    items: {
                        type: "object",
                        properties: {
                            theme: {
                                type: "string",
                                description: "Aqui deve-se conter o tema principal da aula, por exemplo: 'Laços e Condicionais na Computação'",
                            },
                            objectives: {
                                type: "string",
                                description: "Aqui devem conter os objetivos de aprendizado do plano de apredizagem",
                            },
                            duration: {
                                type: "string",
                                description: "Quanto tempo de aula será necessário",
                            },
                            // method: {
                            // 	type: "string",
                            // 	description: "Qual o tipo de metodologia será abordada",
                            // },
                            content: {
                                type: "string",
                                description: "O conteúdo principal do plano de aula",
                            },
                        }
                    },
                },
            },
            //required: ["theme","objectives","duration","method","content", "planArr"]
            required: ["planArr"],
        };
        const structure = {
            name: "returnResponse",
            description: "This function is responsible to return the function in te corect estructure to backend",
            parameters: params,
        };
        console.log(structure);
        return structure;
    }
}
exports.OpenIaService = OpenIaService;
//# sourceMappingURL=openaiService.js.map