import { IsArray, IsHexadecimal } from 'class-validator';

class Answer {
  @IsHexadecimal()
  questionId: string;

  @IsHexadecimal()
  answerId: string;
}

export class CreateAttemptDto {
  @IsArray()
  answers: Answer[];

  @IsHexadecimal()
  quizId: string;
}
