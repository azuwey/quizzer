import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';

class Answer {
  @IsNotEmpty()
  answer: string;

  @IsBoolean()
  isCorrect?: boolean = false;
}

class Question {
  @IsNotEmpty()
  question: string;

  @IsArray()
  answers: Answer[];
}

export class CreateQuizDto {
  @IsArray()
  questions: Question[];
}
