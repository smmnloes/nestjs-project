import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginCredentials } from './auth.controller'
import { UserCredentials } from '../data/entities/user-credentials'
import { Repository } from 'typeorm'
import { genSalt, hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userCredentialsRepository: Repository<UserCredentials>) {
  }

  async login(loginCredentials: LoginCredentials): Promise<LoginResponse> {
    const storedCredentials = await this.userCredentialsRepository.findBy({ username: loginCredentials.username })
    if (storedCredentials === null || storedCredentials.length !== 1) {
      return { login_successful: false }
    }
    const matchedCredentials = storedCredentials[0]
    const compareResult = await compare(loginCredentials.password, matchedCredentials.password_hashed)
    if (compareResult === true) {
      return {
        login_successful: true,
        access_token: this.jwtService.sign({ sub: loginCredentials.username })
      }
    } else {
      return { login_successful: false }
    }
  }

  async register({ username, password }: LoginCredentials): Promise<void> {
    if (await this.userCredentialsRepository.exists({where: {username}})) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT)
    }
    const salt = await genSalt(10)
    const password_hashed = await hash(password, salt)
    await this.userCredentialsRepository.insert({ username, password_hashed })
  }
}

export type LoginResponse = {
  login_successful: boolean
  access_token?: string
}