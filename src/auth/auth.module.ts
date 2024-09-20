import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { DatabaseModule } from '../data/database.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' }
    }),
    DatabaseModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [],
  controllers: [AuthController]
})
export class AuthModule {
}
