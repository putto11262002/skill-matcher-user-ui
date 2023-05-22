import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class Review {
    _id: mongoose.Types.ObjectId;

    @Prop({required: true})
    source: mongoose.Types.ObjectId;

    @Prop({required: true})
    target: mongoose.Types.ObjectId;

    @Prop({})
    status: string;

    @Prop({min: 0, max: 5})
    score: number;

    @Prop({required: true})
    message: string;

    createdAt?: Date;

    updatedAt?: Date;
}

export const reviewSchema = SchemaFactory.createForClass(Review);