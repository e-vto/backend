import { DataSource } from "typeorm";

import models from "../model";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "wecon.sqlite",
	synchronize: true,
	logging: true,
	entities: [...models],
	subscribers: [],
	migrations: [],
});

await AppDataSource.initialize();
