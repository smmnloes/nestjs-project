import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local.guard'


export class LoginCredentials {
  readonly username: string
  readonly password: string
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user)

  }

  @Post('register')
  async register(@Body() credentials: LoginCredentials): Promise<void> {
    await this.authService.register(credentials)
  }
}
