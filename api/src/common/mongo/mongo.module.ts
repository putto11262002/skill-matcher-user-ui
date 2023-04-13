import { Global, Module } from "@nestjs/common";
import { MongoService } from "./mongo.service";

@Global()
@Module({
    providers: [MongoService]
})
export class MongoModule{}