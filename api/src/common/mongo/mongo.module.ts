import { Global, Inject, Module } from "@nestjs/common";
import { MongoService } from "./mongo.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoMemoryProvider } from "./providers/memory-mongo.provider";
import { MongoProvider } from "./providers/mongo.provider";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: process.env.NODE_ENV === 'test' ? MongoMemoryProvider : MongoProvider
          })
    ],
    providers: [MongoService, MongoMemoryProvider, MongoProvider]
})
export class MongoModule{}