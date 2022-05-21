import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ type: String, isRequired: true })
  email: string;

  @Prop({ type: String, isRequired: true })
  passwordHash: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
