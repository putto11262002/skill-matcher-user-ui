import { Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin', 'root')
@Controller('admin/user/privacy-setting')
export class AdminUserPrivacySettingController {
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserPrivacySetting() {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUserPrivacySetting() {}
}
