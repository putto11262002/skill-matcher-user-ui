import {Injectable, Inject, forwardRef, BadRequestException, NotFoundException} from "@nestjs/common"
import { CreateSkillDto } from "../dtos/requests/create-skill.dto";
import { Skill } from "../schemas/skill.schema";
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {difference} from "lodash"
import { UpdateSkillDto } from "../dtos/requests/update.skill.dto";
import {omit} from "lodash"
import { NOT_ALLOW_UPDATE_FIELDS } from "../constants/skill.constant";
@Injectable()
export class SkillService {
    constructor(
        @InjectModel(Skill.name)
        private readonly skillModel: Model<Skill>
    ){}
    async addSkill(skill: CreateSkillDto): Promise<Skill>{
        const existingSkill = await this.skillModel.findOne({name: skill.name});
        if(existingSkill){
            throw new BadRequestException("This skill already exist");
        }
        const createdSkill = await this.skillModel.create({
            name: skill.name.toLowerCase().trim(),
            description: skill.description,
            status: skill.status ? skill.status : 'approved'
        })
        return createdSkill;
    }

    async getSkillByName(name: string): Promise<Skill | null>{
        const skill = await this.skillModel.findOne({name})
        if(!skill){
            throw new  NotFoundException(`Skill named ${name} does not exist`)
        }
        return skill;
    }

    async existByName(name: string): Promise<boolean>{
        const check = await this.skillModel.exists({name: name});
        return check? true : false;
    }

    // TODO - implement searching algorithm
    async searchSkills(){}

    async updateSkill(name: string, skill: UpdateSkillDto){
        const exist = await this.existByName(name);
        if(!exist){
            throw new NotFoundException(`Skill named ${name} does not exist`)
        }
        const updatedSkill = await this.skillModel.findOneAndUpdate({name: name}, omit(skill, NOT_ALLOW_UPDATE_FIELDS), {new: true})
        return updatedSkill;
    }

    async addRelatedSkill(name: string, relatedSkillNames: string[]): Promise<void>{
        const skill = await this.skillModel.findOne({name})
        if(!skill){
            throw new NotFoundException(`Skill named ${name} does not exist`);
        }
        // not allow to add it self to relatedSkills array
        relatedSkillNames = relatedSkillNames.filter(relatedSkillName => relatedSkillName !== skill.name);
        
        const relatedSkills = await this.skillModel.find({name :{$in: relatedSkillNames }})
        const notFoundSkills = difference(relatedSkills.map(relatedSkill => relatedSkill.name), relatedSkillNames);
        if(notFoundSkills.length > 0){
            throw new NotFoundException(`Skill(s) named ${notFoundSkills} does not exist`);
        }
      
        await this.skillModel.updateOne({name}, {$addToSet: {relatedSkills: {$each: relatedSkillNames}}})
    }

    async removeRelatedSkill(name: string, relatedSkillsName: string[]): Promise<void>{
        const skill = await this.skillModel.findOne({name});
        if(!skill){
            throw new NotFoundException(`Skill named ${name} does not exist`);
        }
        await this.skillModel.updateOne({name}, {$pullAll: {relatedSkills: relatedSkillsName}})
    }
}