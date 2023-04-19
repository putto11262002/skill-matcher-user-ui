import { Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user/privacy-setting/self')
export class UserPrivacySettingController {
  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSelfPrivacySetting() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getSelfPrivacySetting() {}
}
