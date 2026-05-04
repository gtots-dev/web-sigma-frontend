import type { UserEntity } from '../entities/user.entity'
import type { UserPermissionsInterface } from '../interfaces/user-permissions.interface'

export interface GetUserMeGateway {
  execute(): Promise<UserEntity & UserPermissionsInterface>
}
