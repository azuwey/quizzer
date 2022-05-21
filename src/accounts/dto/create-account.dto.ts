import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  readonly emailAddress: string;

  @IsNotEmpty()
  readonly passwordHash: string;
}
