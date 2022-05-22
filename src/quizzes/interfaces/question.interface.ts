import { IAnswer } from './answer.interface';

export interface IQuestion {
  question: string;
  answers: IAnswer[];
}
