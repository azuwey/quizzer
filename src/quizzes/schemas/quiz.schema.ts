import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Attempt } from './attempt.schema';
import { Question } from './question.schema';
import { IStatistics } from '../interfaces/statistics.interface';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  questions: Question[];
  attempts?: Attempt[] = [];

  // Dynamically calculate from the attempts
  statistics?: IStatistics = {
    attempts: 0,
    completions: 0,
    scores: 0,
  };
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
QuizSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quiz',
});
QuizSchema.virtual('attempts', {
  ref: 'Attempt',
  localField: '_id',
  foreignField: 'quiz',
});
