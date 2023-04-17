import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, Types } from "mongoose";

@Schema({timestamps: true})
export class File {
    _id: ObjectId;
    @Prop({required: true})
    url: string;

    @Prop({required: true, index: true})
    key: string;

    @Prop({required: true})
    resourceType: string;

    @Prop({required: true, type: Types.ObjectId})
    resourceId: ObjectId;

    createdAt: Date;
    updatedAt: Date;
}

export const fileSchema = SchemaFactory.createForClass(File);