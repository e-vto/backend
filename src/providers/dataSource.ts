import { DataSource } from "typeorm";

import models from "../model/index.js";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "db.rwrvbshcatxetwicgdmo.supabase.co",
    port: 5432,
    username: "postgres",
    password: process.env.DB_KEY,
	database: "postgres",
	synchronize: true,
	logging: true,
	entities: [...models],
	subscribers: [],
	migrations: [],
});

await AppDataSource.initialize();
