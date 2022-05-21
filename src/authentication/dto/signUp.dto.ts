import { IsEmail, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  readonly emailAddress: string;

  @Length(8)
  readonly password: string;
}
