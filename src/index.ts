import "reflect-metadata";

// this shim is required
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controller/UserController.js";
import { Logger } from "tslog";
import type { Application } from "express";
import { AuthorizationChecker } from "./providers/authorization.js";
import { EventController } from "./controller/EventController.js";

const logger = new Logger({ name: "main" });

// creates express app, registers all controller routes and returns you express app instance
const app: Application = createExpressServer({
	controllers: [UserController, EventController], // we specify controllers we want to use
	authorizationChecker: AuthorizationChecker,
});

// run express application on port 3000
app.listen(process.env.PORT ?? 3000, () => {
	logger.info(`Servidor escutando na porta`, process.env.PORT ?? 3000);
});
