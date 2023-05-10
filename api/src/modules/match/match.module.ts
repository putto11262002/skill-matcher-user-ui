import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, matchSchema } from './schemas/match.schema';
import { UserModule } from '../user/user.module';
import { MatchController } from './controllers/match.controller';
import { MatchService } from './services/match.service';
import { MatchRequest, matchRequestSchema } from './schemas/match-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: matchSchema }, {name: MatchRequest.name, schema: matchRequestSchema}]),
    forwardRef(() => UserModule),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}



