import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Quiz } from './quiz.schema';
import { Result } from './result.schema';

export type AttemptDocument = Attempt & Document;

@Schema()
export class Attempt {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Quiz.name, required: true })
  quiz: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  results: Result[];

  // Dynamically calculate from the correct answers
  score: number;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
AttemptSchema.virtual('results', {
  ref: Result.name,
  localField: '_id',
  foreignField: 'attempt',
});
