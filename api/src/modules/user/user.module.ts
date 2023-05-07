import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AdminUserPrivacySettingController } from './controllers/admin-user-privacy-setting.controller';
import { AdminUserController } from './controllers/admin-user.controller';
import { UserPrivacySettingController } from './controllers/user-privacy-setting.controller';
import { UserController } from './controllers/user.controller';
import { User, userSchema } from './schemas/user.schema';

import { UserPrivacySettingService } from './services/user-privacy-setting.service';
import { UserService } from './services/user.service';
import { FileModule } from '../file/file.module';
import { UserSkillListener } from './listeners/user-skill.listener';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    forwardRef(() => AuthModule),
    FileModule
  ],
  controllers: [
    UserController,
    AdminUserController,
    UserPrivacySettingController,
    AdminUserPrivacySettingController,
  ],
  providers: [UserService, UserPrivacySettingService, UserSkillListener],
  exports: [UserService],
})
export class UserModule {}
