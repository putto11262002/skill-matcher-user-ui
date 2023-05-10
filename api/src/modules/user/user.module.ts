import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

import { AdminUserController } from './controllers/admin-user.controller';

import { UserController } from './controllers/user.controller';
import { User, userSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { FileModule } from '../file/file.module';
import { UserSkillListener } from './listeners/user-skill.listener';
import { MatchModule } from '../match/match.module';
import { UserSkill, userSkillSchema } from './schemas/user-skill.schema';
import { UserSkillService } from './services/user-skill.service';
import { UserSkillController } from './controllers/user-skill.controller';
import { AdminUserSkillController } from './controllers/admin-user-skill.controller';
import { SkillModule } from '../skill/skill.module';
import { AdvanceSearchUserService } from './services/advance-search-user.service';
import { RankedSearchUserService } from './services/ranked-search-user.service';
import { UserProfileService } from './services/user-profile.service';
import { RankedSearchUserController } from './controllers/ranked-search-user.controller';
import { AdvanceSearchUserController } from './controllers/advance-search-user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: UserSkill.name, schema: userSkillSchema },
    ]),
    forwardRef(() => AuthModule),
    FileModule,
    forwardRef(() => MatchModule),
    SkillModule,
  ],
  controllers: [
    UserController,
    AdminUserController,
    UserSkillController,
    AdminUserSkillController,
    RankedSearchUserController,
    AdvanceSearchUserController
  ],
  providers: [
    UserService,
    UserSkillListener,
    UserSkillService,
    AdvanceSearchUserService,
    RankedSearchUserService,
    UserProfileService,
  ],
  exports: [UserService, UserSkillService],
})
export class UserModule {}
