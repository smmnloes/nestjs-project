import { Body, Controller, Post } from '@nestjs/common'
import { AuthService, LoginResponse } from './auth.service'


export class LoginCredentials  {
  readonly username: string
  readonly password: string
}


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() credentials: LoginCredentials): Promise<LoginResponse> {
    return this.authService.login(credentials)
  }
}
