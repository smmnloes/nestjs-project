import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginCredentials } from './auth.controller'
import { User } from '../data/entities/user'
import { Repository } from 'typeorm'
import { genSalt, hash, compare } from 'bcrypt'
import { Permission } from './permissions/permission'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userCredentialsRepository: Repository<User>) {
  }

  async validateUser(usernameInput: string, passwordInput: string): Promise<UserPayload> {
    const storedCredentials = await this.userCredentialsRepository.findBy({ username: usernameInput })
    if (storedCredentials === null || storedCredentials.length !== 1) {
      throw new UnauthorizedException()
    }
    const {password_hashed, username, permissions} = storedCredentials[0]
    const compareResult = await compare(passwordInput, password_hashed)
    if (compareResult === true) {
      return { username,  permissions: permissions as Permission[]}
    } else {
      throw new UnauthorizedException()
    }
  }

  async login(userPayload: UserPayload) {
    return {
      access_token: this.jwtService.sign(userPayload)
    }
  }

  async register({ username, password }: LoginCredentials): Promise<void> {
    if (await this.userCredentialsRepository.exists({ where: { username } })) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT)
    }
    const salt = await genSalt(10)
    const password_hashed = await hash(password, salt)
    await this.userCredentialsRepository.insert({ username, password_hashed, permissions: [Permission.VIEW_PROFILE] })
  }
}

type UserPayload = {
  username: string,
  permissions: Permission[]
}