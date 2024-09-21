import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'


export class LoginCredentials {
  readonly username: string
  readonly password: string
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginCredentials): Promise<{ access_token: string }> {
    const { access_token, login_successful } = await this.authService.login(credentials)
    if (login_successful) {
      return { access_token }
    } else {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('register')
  async register(@Body() credentials: LoginCredentials): Promise<void> {
    await this.authService.register(credentials)
  }
}
