import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Attempt } from './attempt.schema';
import { Question } from './question.schema';
import { Answer } from './answer.schema';

export type ResultDocument = Result & Document;

@Schema()
export class Result {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Attempt.name, required: true })
  attempt: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Question.name, required: true })
  question: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Answer.name, required: true })
  answer: Types.ObjectId;
}

export const ResultSchema = SchemaFactory.createForClass(Result);
