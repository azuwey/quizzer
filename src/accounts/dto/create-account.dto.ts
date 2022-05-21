import { IsEmail, Length } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  readonly email: string;

  @Length(8)
  readonly password: string;
}
