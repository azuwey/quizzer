import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ISubQuiz } from '../interfaces/question.interface';
import { Attempt } from './attempt.schema';

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
  subQuizzes: ISubQuiz[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  attempts?: Attempt[] = [];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
QuizSchema.virtual(Quiz.name, {
  ref: Attempt.name,
  localField: '_id',
  foreignField: 'attempts',
});
