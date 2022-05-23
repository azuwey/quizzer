import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Attempt } from './attempt.schema';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  questions: Question[];
  attempts: Attempt[] = [];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
QuizSchema.set('toObject', { virtuals: true });
QuizSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quiz',
  getters: true,
});
QuizSchema.virtual('attempts', {
  ref: 'Attempt',
  localField: '_id',
  foreignField: 'quiz',
});
