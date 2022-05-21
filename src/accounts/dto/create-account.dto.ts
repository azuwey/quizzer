import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly passwordHash: string;
}
