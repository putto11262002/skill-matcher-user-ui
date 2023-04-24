import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { Profile, profileSchema } from './profile.schema';
import { File } from '../../file/schemas/file.schema';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true, index: true, unique: true, trim: true })
  username: string;

  @Prop({
    required: true,
    index: true,
    trim: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: profileSchema })
  profile?: Profile;

  @Prop({type: Types.ObjectId, ref: 'File'})
  avatar: File

  @Prop()
  refreshToken?: string;

  @Prop({ default: Date.now() })
  createdAt?: Date;

  @Prop({ default: Date.now() })
  updatedAt?: Date;
}

export type UserDocument = HydratedDocument<User>;
export const userSchema = SchemaFactory.createForClass(User);
