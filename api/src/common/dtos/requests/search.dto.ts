import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';
 
export class SearchDto {
  @ApiProperty()
  @IsOptional()
  pageNumber?: number;
 
  @ApiProperty()
  @IsOptional()
  pageSize?: number;
 
  constructor(pageNumber?: number, pageSize?: number) {
    this.pageNumber =pageNumber;
    this.pageSize = pageSize;
  }
}