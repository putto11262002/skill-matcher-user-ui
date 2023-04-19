import mongoose from "mongoose"
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
@Schema({timestamps: true})
export class UserSkill {
    _id: mongoose.ObjectId

    @Prop({required: true, index: true, type: mongoose.Schema.Types.ObjectId})
    userId: mongoose.ObjectId;

    @Prop({required: true, index: true})
    skill: string;

    @Prop({required: true, max: 10, min: 0})
    // number from 0 to 10, 10 being the highest proficientcy
    proficiency: number;

    @Prop()
    about: string;
    // indicates whether user is a learner or a tuitor

    @Prop({required: true})
    role: string;
}
export type UserSkillDocument = mongoose.HydratedDocument<UserSkill>
export const userSkillSchema = SchemaFactory.createForClass(UserSkill)