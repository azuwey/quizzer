import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/signUp.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { ISignInRequest } from './interfaces/signInRequest.interface';
import { ApiImplicitBody } from '@nestjs/swagger/dist/decorators/api-implicit-body.decorator';
import { SignInDto } from './dto/signInDto';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiImplicitBody({ name: '', content: {}, type: SignInDto })
  signIn(@Request() req: ISignInRequest) {
    return this.authenticationService.signIn(req.user);
  }
}
