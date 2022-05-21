import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAccountDto } from '../accounts/dto/create-account.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('authentication/sign-up')
  signUp(@Body() createAccountDto: CreateAccountDto) {
    return this.authenticationService.signUp(createAccountDto);
  }

  @Post('authentication/sign-in')
  signIn(@Body() createAccountDto: CreateAccountDto) {
    return this.authenticationService.signUp(createAccountDto);
  }
}
