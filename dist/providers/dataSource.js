"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const model_1 = __importDefault(require("../model"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "db.rwrvbshcatxetwicgdmo.supabase.co",
    port: 5432,
    username: "postgres",
    password: process.env.DB_KEY,
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [...model_1.default],
    subscribers: [],
    migrations: [],
});
await exports.AppDataSource.initialize();
//# sourceMappingURL=dataSource.js.map