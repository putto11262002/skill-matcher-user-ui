import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import mongoConfig from './config/mongo.config';
import { AuthModule } from './modules/auth/auth.module';

import { UserModule } from './modules/user/user.module';
import { SkillModule } from './modules/skill/skill.module';
import { MongoModule } from './common/mongo/mongo.module';
import { MatchModule } from './modules/match/match.module';


@Module({
  imports: [
  
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, appConfig, authConfig],
    }),
    UserModule,
    AuthModule,
    SkillModule,
    MongoModule,
    MatchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
