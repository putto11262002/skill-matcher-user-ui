import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

@Schema({_id: false})
export class MatchUser {
    @Prop({type: Types.ObjectId, index: true, required: true})
    userId: ObjectId;

    @Prop({})
    status: string;
}

export const matchUserSchema = SchemaFactory.createForClass(MatchUser);
