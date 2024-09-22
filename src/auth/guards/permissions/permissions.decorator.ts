import { SetMetadata } from '@nestjs/common'
import { Permissions } from './permissions'

export const PERMISSIONS_KEY = 'permissions'
export const RequirePermissions = (...permissions: Permissions[]) => SetMetadata(PERMISSIONS_KEY, permissions)
