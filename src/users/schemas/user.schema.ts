import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quiz } from '../../quizzes/schemas/quiz.schema';
import { Attempt } from '../../quizzes/schemas/attempt.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String, isRequired: true })
  emailAddress: string;

  @Prop({ type: String, isRequired: true })
  passwordHash: string;

  quizzes?: Quiz[] = [];
  attempts?: Attempt[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('quizzes', {
  ref: 'Quiz',
  localField: '_id',
  foreignField: 'owner',
});
UserSchema.virtual('attempts', {
  ref: 'Attempt',
  localField: '_id',
  foreignField: 'user',
});
