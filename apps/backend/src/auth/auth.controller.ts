import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard, CurrentUser, Public } from './auth.guard';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() payload: SignInDto) {
    return this.authService.signIn(payload.email, payload.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
