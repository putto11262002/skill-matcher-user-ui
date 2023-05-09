import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from '../../../../common/dtos/requests/search.dto';
import { IsArray, IsIn, IsOptional, IsString, Validate } from 'class-validator';
import { USER_ROLE, USER_STATUS } from '../../constants/user.constant';
import { ObjectId, Types } from 'mongoose';
import { each } from 'lodash';
import { Transform, Type } from 'class-transformer';
import { toMongoObjectId } from '../../../../common/helpers/dto.helper';

export class SearchUserDto extends SearchDto {
  @ApiProperty()
  @IsOptional()
  @IsIn(Object.values(USER_STATUS))
  status?: string;

  // partial text search on username, email, first name, last name
  @ApiProperty()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => Array<Types.ObjectId>)
  @Transform(({value}) => value.split(',').map(id =>  toMongoObjectId({value: id, key: undefined})))
  excludeIds?: Array<Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => Array<Types.ObjectId>)
  @Transform(({value}) => value.split(',').map(id =>  toMongoObjectId({value: id, key: undefined})))
  includeIds?: Array<Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsIn(Object.values(USER_ROLE), {each: true})
  @Transform(({value}) => value.split(','))
  roles: Array<String>;
}
