import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, skillSchema } from './schemas/skill.schema';
import { UserModule } from '../user/user.module';
import { SkillService } from './services/skill.service';
import { SkillController } from './controllers/skill.controller';
import { AdminSkillController } from './controllers/admin-skill.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Skill.name, schema: skillSchema },
     
    ]),
   
  ],
  providers: [SkillService],
  controllers: [SkillController, AdminSkillController, ],
  exports: [SkillService]
})
export class SkillModule {}
