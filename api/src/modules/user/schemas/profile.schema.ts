import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ id: false })
export class Profile {
  @Prop({})
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  gender?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  contactEmail?: string;

  @Prop()
  instagram?: string;

  @Prop()
  snapchat?: string;

  @Prop()
  facebook?: string;

  @Prop()
  whatsapp?: string;

  @Prop()
  aboutMe?: string;

  @Prop()
  skills?: string[]
}

export const profileSchema = SchemaFactory.createForClass(Profile);
