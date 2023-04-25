import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PrivacySetting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: Types.ObjectId;
}

export type PrivacySettingDocument = HydratedDocument<PrivacySetting>;
export const privacySettingSchema =
  SchemaFactory.createForClass(PrivacySetting);
