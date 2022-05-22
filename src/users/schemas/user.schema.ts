import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String, isRequired: true })
  emailAddress: string;

  @Prop({ type: String, isRequired: true })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
