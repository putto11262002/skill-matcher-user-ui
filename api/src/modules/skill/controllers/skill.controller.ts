import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { SkillService } from "../services/skill.service";
import { SkillDto } from "../dtos/responses/skill.dto";
import { CreateSkillDto } from "../dtos/requests/create-skill.dto";
import { NOT_ALLOW_USER_CREATE_FIELDS, SKILL_STATUS } from "../constants/skill.constant";
import {omit} from "lodash"

@ApiTags("Skill")
@UseGuards(AuthGuard)
@Controller("skill")
export class SkillController {

    constructor(
        private readonly skillService: SkillService
    ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    async searchSkills(){
        throw new HttpException("Not implemented yet", 404)
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
        await this.skillService.addSkill(omit({...payload, status: SKILL_STATUS.PENDING}, NOT_ALLOW_USER_CREATE_FIELDS))
    }

}