import { Injectable, OnModuleDestroy, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// export const MongoMemoryServerProvider = {
//     provide: 'MONGO_MEMORY_SERVER',
//     useFactory:  async (): Promise<MongoMemoryServer> => {
//         const memoryMongo = await MongoMemoryServer.create();
//         return memoryMongo;
//     }
// }

@Injectable()
export class MongoMemoryProvider implements MongooseOptionsFactory, OnModuleDestroy {
    private mongoServer: MongoMemoryServer;

    constructor(private configService: ConfigService){}


    async createMongooseOptions(): Promise<MongooseModuleOptions> {
        if(!this.mongoServer) this.mongoServer = await MongoMemoryServer.create();
        const uri = await this.mongoServer.getUri();
        return {
            uri,
            ...this.configService.get('mongo.options')
        }
        
    }

    async onModuleDestroy() {
        if(this.mongoServer) await this.mongoServer.stop()
    }

    



}