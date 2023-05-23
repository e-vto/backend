import { AuthorizationChecker } from "./providers/authorization.js";
import controllers from "./controller/index.js";

import { createExpressServer } from "routing-controllers";
import type { Application } from "express";
import { Logger } from "tslog";

const logger = new Logger({ name: "main" });

const app: Application = createExpressServer({
	controllers: controllers, // we specify controllers we want to use
	authorizationChecker: AuthorizationChecker,
});

app.listen(process.env.PORT ?? 3000, () => {
	logger.info("Servidor de API iniciado! Porta", parseInt(process.env.PORT ?? "3000"));
});
