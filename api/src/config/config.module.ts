import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import authConfig from "./auth.config";
import awsConfig from "./aws.config";
import mongoConfig from "./mongo.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [mongoConfig, appConfig, authConfig, awsConfig],
            
          }),
    ]
})
export class _ConfigModule{}