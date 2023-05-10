
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  * as mongoose from "mongoose";
import { User } from "../../user/schemas/user.schema";


@Schema({timestamps: true})
export class Match {
    _id: mongoose.Types.ObjectId;

    // contain the id of users involve in the match
    @Prop([{type: mongoose.Schema.Types.ObjectId, minlength: 2, maxlength: 2,}])
    users: mongoose.Types.ObjectId[];

    createdAt: Date;

    updatedAt: Date;
}

export type MatchDocument = mongoose.HydratedDocument<Match>

export const matchSchema = SchemaFactory.createForClass(Match)