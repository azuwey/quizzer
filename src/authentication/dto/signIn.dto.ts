import { IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  readonly emailAddress: string;

  @Length(8)
  readonly password: string;
}
