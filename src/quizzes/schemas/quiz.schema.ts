import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IQuestion } from '../interfaces/question.interface';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
  _id: Types.ObjectId;

  @Prop({
    type: [
      {
        question: { type: String },
        answers: [{ answer: { type: String }, isCorrect: { type: Boolean } }],
      },
    ],
  })
  questions: IQuestion[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
