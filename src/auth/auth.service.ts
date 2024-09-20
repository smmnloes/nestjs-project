import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginCredentials } from './auth.controller'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  async login(loginCredentials: LoginCredentials): Promise<LoginResponse> {
    // check if password correct
    return {
      access_token: this.jwtService.sign({ sub: loginCredentials.username })
    }
  }
}

export type LoginResponse = {
  access_token: string
}