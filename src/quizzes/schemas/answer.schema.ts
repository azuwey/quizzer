import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Result } from './result.schema';
import { Question } from './question.schema';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  question: Types.ObjectId;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Boolean, required: true })
  isCorrect?: boolean = false;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
AnswerSchema.virtual('results', {
  ref: 'Result',
  localField: '_id',
  foreignField: 'question',
});
