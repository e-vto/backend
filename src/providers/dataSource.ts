import { DataSource } from "typeorm";

import models from "../model";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "wecon.sqlite",
	synchronize: true, // true reseta o banco toda inicialização
	logging: true,
	entities: [...models],
	subscribers: [],
	migrations: [],
});

await AppDataSource.initialize();
