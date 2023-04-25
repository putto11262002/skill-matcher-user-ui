import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { USER_SKILL_ROLE } from "../../constants/user-skill.constant";
import { SearchDto } from "../../../../common/dtos/requests/search.dto";
import { Types } from "mongoose";
import { Transform, Type } from "class-transformer";
import { toMongoObjectId } from "../../../../common/helpers/dto.helper";

export class SearchUserSkillDto  extends SearchDto {
    @ApiProperty()
    @IsOptional()
    @IsIn(Object.values(USER_SKILL_ROLE))
    role: string;



    constructor(pageNumber: number, pageSize: number, role: string){
        super(pageNumber, pageSize)
        this.role = role;
    }

}