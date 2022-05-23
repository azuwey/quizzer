import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty()
  readonly emailAddress: string;

  @Length(8)
  @ApiProperty()
  readonly password: string;
}
