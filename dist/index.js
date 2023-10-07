"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
// this shim is required
const routing_controllers_1 = require("routing-controllers");
const UserController_js_1 = require("./controller/UserController.js");
const tslog_1 = require("tslog");
const authorization_js_1 = require("./providers/authorization.js");
const OpenaiController_js_1 = __importDefault(require("./controller/OpenaiController.js"));
const logger = new tslog_1.Logger({ name: "main" });
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_js_1.UserController, OpenaiController_js_1.default],
    authorizationChecker: authorization_js_1.AuthorizationChecker,
});
// run express application on port 3000
app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000, () => {
    var _a;
    logger.info(`Servidor escutando na porta`, (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
});
//# sourceMappingURL=index.js.map