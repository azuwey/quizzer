import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  _id: Types.ObjectId;

  @Prop({ type: String, isRequired: true })
  emailAddress: string;

  @Prop({ type: String, isRequired: true })
  passwordHash: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
