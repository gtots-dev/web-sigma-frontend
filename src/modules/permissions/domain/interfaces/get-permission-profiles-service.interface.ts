import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PermissionProfileInterface } from './permission-profiles.interface'

export interface GetPermissionProfilesServiceInterface {
  execute(token: TokenEntities): Promise<PermissionProfileInterface[]>
}
