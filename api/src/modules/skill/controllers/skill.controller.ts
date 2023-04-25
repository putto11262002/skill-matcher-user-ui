import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { SkillService } from "../services/skill.service";
import { SkillDto } from "../dtos/responses/skill.dto";
import { CreateSkillDto } from "../dtos/requests/create-skill.dto";
import { NOT_ALLOW_USER_CREATE_FIELDS, SKILL_STATUS } from "../constants/skill.constant";
import {omit} from "lodash"
import { SearchSkillDto } from "../dtos/requests/search-skill.dto";
import { Pagination } from "../../../common/dtos/responses/pagination.dto";
import { UpdateSkillDto } from "../dtos/requests/update.skill.dto";

@ApiTags("Skill")
@UseGuards(AuthGuard)
@Controller("skill")
export class SkillController {

    constructor(
        private readonly skillService: SkillService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async searchSkills(@Query() query: SearchSkillDto){
        const {skills, total} = await this.skillService.searchSkills({...query, status: SKILL_STATUS.APPROVED})
        return new Pagination(skills, query.pageSize, query.pageNumber, total);
    }

    @Get(":name")
    @HttpCode(HttpStatus.OK)
    async getSkill(@Param("name") name: string){
        const skill = await this.skillService.getSkillByName(name);
        return new SkillDto(skill).toUserResponse()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async submitSkillRequest(@Body() payload: CreateSkillDto){
        await this.skillService.addSkill(omit({...payload, status: SKILL_STATUS.PENDING}, NOT_ALLOW_USER_CREATE_FIELDS) as CreateSkillDto)
    }

}