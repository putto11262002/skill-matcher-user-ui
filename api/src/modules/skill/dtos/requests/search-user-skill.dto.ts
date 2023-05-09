import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, Matches } from 'class-validator';
import * as mongoose from 'mongoose';
import { toMongoObjectId } from '../../../../common/helpers/dto.helper';
import { USER_ROLE } from '../../../user/constants/user.constant';
import { USER_SKILL_ROLE } from '../../constants/user-skill.constant';
import { ValidationPipe } from '@nestjs/common';
export class SearchUserSkillDto {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => Array<mongoose.Types.ObjectId>)
  @Transform(({ value }) =>
    value
      .split(',')
      .map((id) => toMongoObjectId({ value: id, key: undefined })),
  )
  excludeUserIds: Array<mongoose.Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => Array<mongoose.Types.ObjectId>)
  @Transform(({ value }) =>
    value
      .split(',')
      .map((id) => toMongoObjectId({ value: id, key: undefined })),
  )
  includeUserIds: Array<mongoose.Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsIn(Object.values(USER_SKILL_ROLE), { each: true })
  @Transform(({ value }) => value.split(','))
  roles: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills: Array<string>;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Matches(/^([0-9]{1,2}):(gt|lt|eq|)$/, {
    message:
      'Invalid proficiency, it must be in this format <0 - 10>:<gt/lt/eq>',
  })
  proficiency: string;
}
