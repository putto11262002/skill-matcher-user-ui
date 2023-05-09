import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { MongoModule } from './common/mongo/mongo.module';
import { MatchModule } from './modules/match/match.module';
import { _ConfigModule } from './config/config.module';
import { RankingSearchModule } from './modules/ranking-search/feed.module';
import { EventModule } from './common/event/event.module';


@Module({
  imports: [
    EventModule,
    _ConfigModule,
    UserModule,
    AuthModule,
    SkillModule,
    MongoModule,
    MatchModule,
    RankingSearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
