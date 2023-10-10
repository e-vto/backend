import "reflect-metadata";
import 'dotenv/config';
// this shim is required
import { createExpressServer } from "routing-controllers";
import { Logger } from "tslog";
import { AuthorizationChecker } from "./providers/authorization.js";
import path from "path";
const logger = new Logger({ name: "main" });
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    //controllers: [UserController, OpenaiController], // we specify controllers we want to use
    controllers: [path.join(__dirname + '/controllers/*.js')],
    authorizationChecker: AuthorizationChecker,
}).listen(3000);
// run express application on port 3000
app.listen(process.env.PORT ?? 3000, () => {
    logger.info(`Servidor escutando na porta`, process.env.PORT ?? 3000);
});
