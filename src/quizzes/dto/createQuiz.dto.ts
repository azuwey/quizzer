import { ArrayMinSize, IsArray, IsBoolean, IsNotEmpty } from 'class-validator';

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
  @ArrayMinSize(1)
  answers: Answer[];
}

export class CreateQuizDto {
  @IsArray()
  @ArrayMinSize(1)
  questions: Question[];
}
