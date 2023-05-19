import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { toMongoObjectId } from '../../../../common/helpers/dto.helper';
import { REPORT_CATEGORY } from '../../constants/report.constant';


export class CreateReportDto {

    @ApiProperty({type: String, description: 'id of target user', required: false})
    @IsOptional()
    @Type(() => mongoose.Types.ObjectId)
    @Transform(toMongoObjectId)
    target?: mongoose.Types.ObjectId;

    @ApiProperty({type: String, description: `One of the following category ${Object.values(REPORT_CATEGORY).join(', ')}`})
    @IsOptional()
    @IsIn(Object.values(REPORT_CATEGORY))
    category?: string;

    @ApiProperty({required: true})
    @IsNotEmpty()
    @IsString()
    message: string;
}