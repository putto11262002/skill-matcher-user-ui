import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsNumberString, IsOptional } from 'class-validator';
import { toMongoSort } from '../../helpers/dto.helper';
import mongoose from 'mongoose';
 
export class SearchDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  pageNumber?: number;
 
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number(value))
  pageSize?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Transform(({value}) => value.split(',').map(sortValues => toMongoSort({value: sortValues, key: undefined})))
  sort?: [string, mongoose.SortOrder][]
  constructor(pageNumber?: number, pageSize?: number) {
    this.pageNumber = pageNumber? pageNumber : 0;
    this.pageSize = pageSize ? pageSize : 20;
  }
}