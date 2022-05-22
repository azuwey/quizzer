import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quiz } from './quiz.schema';
import { IAttempt } from '../interfaces/attempt.interface';

export type StatisticsDocument = Attempt & Document;

@Schema()
export class Attempt {
  _id: Types.ObjectId;

  @Prop({
    type: [
      {
        question: { type: String },
        answers: { isCorrect: { type: Boolean } },
      },
    ],
  })
  attempt: IAttempt[];

  @Prop({ type: Types.ObjectId, ref: Quiz.name, required: true })
  quiz: Types.ObjectId;

  // Dynamically calculate from the correct answers
  score: number;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
