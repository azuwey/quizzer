import { IsArray, IsHexadecimal, IsNotEmpty } from 'class-validator';

class Answer {
  @IsHexadecimal()
  @IsNotEmpty()
  questionId: string;

  @IsHexadecimal()
  @IsNotEmpty()
  answerId: string;
}

export class CreateAttemptDto {
  @IsArray()
  answers: Answer[];

  @IsHexadecimal()
  quizId: string;
}
