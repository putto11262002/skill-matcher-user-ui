import { ApiProperty } from '@nestjs/swagger';
import { SearchDto } from '../../../../common/dtos/requests/search.dto';
import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { USER_STATUS } from '../../constants/user.constant';
import { ObjectId, Types } from 'mongoose';

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
