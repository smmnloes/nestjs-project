import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginCredentials } from './auth.controller'
import { UserCredentials } from '../data/entities/user-credentials'
import { Repository } from 'typeorm'
import { genSalt, hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userCredentialsRepository: Repository<UserCredentials>) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    const storedCredentials = await this.userCredentialsRepository.findBy({ username: username })
    if (storedCredentials === null || storedCredentials.length !== 1) {
      throw new UnauthorizedException()
    }
    const matchedCredentials = storedCredentials[0]
    const compareResult = await compare(password, matchedCredentials.password_hashed)
    if (compareResult === true) {
      return { username }
    } else {
      throw new UnauthorizedException()
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register({ username, password }: LoginCredentials): Promise<void> {
    if (await this.userCredentialsRepository.exists({ where: { username } })) {
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