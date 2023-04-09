import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { RoleGuard } from "src/modules/auth/guards/role.guard";
import { CreateSkillDto } from "../dtos/requests/create-skill.dto";
import { SkillService } from "../services/skill.service";
import { SkillDto } from "../dtos/responses/skill.dto";
import { UpdateSkillDto } from "../dtos/requests/update.skill.dto";
import { RelatedSkillsDto } from "../dtos/requests/related-skills.dto";

@ApiTags("Skill Admin")
@Roles("admin")
@UseGuards(RoleGuard)
@Controller("admin/skill")
export class AdminSkillController {
    constructor(
        private readonly skillService: SkillService
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addSkill(@Body() payload: CreateSkillDto){
        const createdSkill = await this.skillService.addSkill(payload);
        return new SkillDto(createdSkill).toAdminResponse()
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async searchSkills(){
       throw new Error("Not implemented yet")
    }

    @Get(":name")
    @HttpCode(HttpStatus.OK)
    async getSkill(@Param("name") name: string){
        const skill = await this.skillService.getSkillByName(name);
        return new SkillDto(skill).toAdminResponse()
    }

    @Put(":name")
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateSkill(@Param("name") name: string, @Body() payload: UpdateSkillDto){
        await this.skillService.updateSkill(name, payload);
    }

    @Post(":name/related-skills")
    @HttpCode(HttpStatus.NO_CONTENT)
    async addRelatedSkills(@Param("name") name: string, @Body() payload: RelatedSkillsDto){
        await this.skillService.addRelatedSkill(name, payload.relatedSkills)
    }

    @Delete(":name/related-skills")
    @HttpCode(HttpStatus.NO_CONTENT)
    async removeRelatedSkills(@Param("name") name: string, @Body() payload: RelatedSkillsDto){
        await this.skillService.removeRelatedSkill(name, payload.relatedSkills);
    }

}