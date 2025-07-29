import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'

export interface JwtDecodeDataInterface {
  login_name: string
  id: number
  operation_ids: number[]
  exp: number
  permissions: UserPermissionsInterface
  accessToken: string
}
