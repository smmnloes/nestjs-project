import { Controller, Get, Render, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { RequirePermissions } from './auth/guards/permissions/permissions.decorator'
import { Permissions } from './auth/guards/permissions/permissions'

@Controller()
export class AppController {
  constructor() {
  }

  @Render('index')
  @Get()
  index() {
  }

  @Render('register')
  @Get('register')
  register() {
  }

  @RequirePermissions(Permissions.VIEW_PROFILE)
  @UseGuards(JwtAuthGuard)
  @Render('userprofile')
  @Get('profile')
  userprofile() {
  }
}
