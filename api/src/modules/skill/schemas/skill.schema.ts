import {ObjectId, HydratedDocument, Document, Types} from "mongoose"
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
@Schema({timestamps: true})
export class Skill extends Document {
    _id: Types.ObjectId;
    @Prop({required: true, trim: true, lowercase: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    status: string;

    @Prop([{type: String}])
    relatedSkills: string[];
    

}


let schema = SchemaFactory.createForClass(Skill)

export const skillSchema = schema;