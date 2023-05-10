import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { User } from "../../user/schemas/user.schema";

@Schema({timestamps: true})
export class MatchRequest{
    
    _id: mongoose.Types.ObjectId;

    // The user that request the match
    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    from: mongoose.Types.ObjectId;

    // The user that is being requested to match with
    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    to: mongoose.Types.ObjectId;

    createdAt: Date;

    updatedAt: Date;
}

export type MatchRequestDocument = mongoose.HydratedDocument<MatchRequest>;
export const matchRequestSchema = SchemaFactory.createForClass(MatchRequest);