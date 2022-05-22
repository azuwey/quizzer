import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly emailAddress: string;

  @IsNotEmpty()
  readonly passwordHash: string;
}
