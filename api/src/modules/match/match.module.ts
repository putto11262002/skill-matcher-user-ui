import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Match, matchSchema } from "./schemas/match.schema";
import { UserModule } from "../user/user.module";
import { MatchController } from "./controllers/match.controller";
import { MatchService } from "./services/match.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Match.name, schema: matchSchema},]), UserModule],
    controllers: [MatchController],
    providers: [MatchService]
})
export class MatchModule{}