import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signUp.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ISignInRequest } from './interfaces/signInRequest.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Request() req: ISignInRequest) {
    return this.authenticationService.signIn(req.user);
  }
}
