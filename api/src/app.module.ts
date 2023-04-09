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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, appConfig, authConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uriString = await configService.get<string>('mongo.uri');
        const uri = new URL(uriString);
        const options: { [key: string]: string } = await configService.get(
          'mongo.options',
        );
        for (const [key, value] of Object.entries(options)) {
          uri.searchParams.set(key, value);
        }

        return {
          uri: uri.toString(),
        };
      },
    }),
    UserModule,
    AuthModule,
    SkillModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
