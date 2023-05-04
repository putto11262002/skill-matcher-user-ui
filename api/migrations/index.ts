import { mongoMigrateCli } from "mongo-migrate-ts";
import * as dotenv from "dotenv"
dotenv.config()

mongoMigrateCli({
    uri: process.env.MONGO_URI,
    migrationsDir: __dirname,
    options: {
        authMechanism: 'DEFAULT',
        authSource: "admin"
    }
})