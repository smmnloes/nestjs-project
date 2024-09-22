import { Controller, Get, Render, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/guards/jwt.guard'
import { RequirePermissions } from './auth/permissions/permissions.decorator'
import { Permission } from './auth/permissions/permission'

@Controller()
export class AppController {
  constructor() {
  }

  @Render('index')
  @Get()
  index() {
  }

  @RequirePermissions(Permission.VIEW_PROFILE)
  @UseGuards(JwtAuthGuard)
  @Render('userprofile')
  @Get('profile')
  userprofile() {
  }
}
