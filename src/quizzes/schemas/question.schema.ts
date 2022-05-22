import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quiz } from './quiz.schema';
import { Answer } from './answer.schema';
import { Result } from './result.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Quiz.name, required: true })
  quiz: Types.ObjectId;

  @Prop({ type: String })
  question: string;

  answers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.virtual('answers', {
  ref: Answer.name,
  localField: '_id',
  foreignField: 'question',
});
QuestionSchema.virtual('results', {
  ref: Result.name,
  localField: '_id',
  foreignField: 'question',
});
