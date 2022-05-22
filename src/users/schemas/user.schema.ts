import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Quiz, QuizSchema } from '../../quizzes/schemas/quiz.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String, isRequired: true })
  emailAddress: string;

  @Prop({ type: String, isRequired: true })
  passwordHash: string;

  quizzes?: Quiz[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);
QuizSchema.virtual(User.name, {
  ref: Quiz.name,
  localField: '_id',
  foreignField: 'quizzes',
});
