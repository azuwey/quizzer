import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Result } from './result.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  question: Types.ObjectId;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Boolean, required: true })
  isCorrect: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
AnswerSchema.virtual('results', {
  ref: Result.name,
  localField: '_id',
  foreignField: 'question',
});
