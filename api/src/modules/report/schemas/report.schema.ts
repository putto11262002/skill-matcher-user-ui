import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({timestamps: true})
export class Report {
    _id: mongoose.Types.ObjectId;

    @Prop()
    source: mongoose.Types.ObjectId;

    @Prop()
    target?: mongoose.Types.ObjectId;

    @Prop()
    category: string;

    @Prop()
    message?: string;

    createdAt: Date;

    updatedAt: Date;
}

export const reportSchema = SchemaFactory.createForClass(Report);