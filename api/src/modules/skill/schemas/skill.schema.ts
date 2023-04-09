import {ObjectId, HydratedDocument, Document} from "mongoose"
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
@Schema({timestamps: true})
export class Skill extends Document {
    _id: ObjectId;
    @Prop({required: true, trim: true, lowercase: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop([{type: String}])
    relatedSkills: string[];
    

}


export const skillSchema = SchemaFactory.createForClass(Skill)