import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IJwtAuthenticatedRequest } from '../authentication/interfaces/jwtAuthenticatedRequest.interface';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { QuizzesService } from './quizzes.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jtwAuth.guard';
import { CreateAttemptDto } from './dto/createAttempt.dto';

@ApiBearerAuth()
@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(
    @Request() req: IJwtAuthenticatedRequest,
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return this.quizzesService.create(createQuizDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Request() req: IJwtAuthenticatedRequest, @Param('id') id: string) {
    return this.quizzesService.findOneId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getByUserId(
    @Request() req: IJwtAuthenticatedRequest,
    @Param('userId') userId: string,
  ) {
    return this.quizzesService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('attempt')
  attempt(
    @Request() req: IJwtAuthenticatedRequest,
    @Body() createQuizDto: CreateAttemptDto,
  ) {
    return this.quizzesService.attempt(createQuizDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  statistics(
    @Request() req: IJwtAuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.quizzesService.statistics(id);
  }
}
