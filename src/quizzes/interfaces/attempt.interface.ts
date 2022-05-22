import { IAnswer } from './answer.interface';

export interface IAttempt {
  question: string;
  answers: Pick<IAnswer, 'isCorrect'>;
}
