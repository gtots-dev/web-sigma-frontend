import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
import type { UserPermissionsInterface } from './user-permissions.interface'

export interface GetUserMeServiceInterface {
  execute(token: TokenEntities): Promise<UserEntity & UserPermissionsInterface>
}
