import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { toMongoObjectId } from '../../../../common/helpers/dto.helper';
import { REPORT_CATEGORY } from '../../constants/report.constant';


export class CreateReportDto {

    @ApiProperty()
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target?: mongoose.Types.ObjectId;

    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(REPORT_CATEGORY))
    category?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string;
}