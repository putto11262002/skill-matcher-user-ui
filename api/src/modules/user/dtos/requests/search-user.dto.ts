import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from '../../../../common/dtos/requests/search.dto';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { USER_ROLE, USER_STATUS } from '../../constants/user.constant';
import { ObjectId, Types } from 'mongoose';
import { each } from 'lodash';
import { Transform } from 'class-transformer';

export class SearchUserDto extends SearchDto {
  @ApiProperty()
  @IsOptional()
  @IsIn(Object.values(USER_STATUS))
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({each: true})
  excludeIds?: Array<Types.ObjectId>;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsIn(Object.values(USER_ROLE), {each: true})
  @Transform(({value}) => value.split(','))
  roles: Array<String>;

  constructor(
    pageNumber: number,
    pageSize: number,
    status: string,
    q: string,
    excludeIds: Array<Types.ObjectId>,
  ) {
    super(pageNumber, pageSize);
    this.status = status;
    this.q = q;
    this.excludeIds = excludeIds;
  }
}
