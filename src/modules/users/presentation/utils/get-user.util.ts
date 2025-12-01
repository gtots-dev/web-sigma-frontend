import { GetUserMeFactory } from '../../infrastructure/factories/get-user-me.factory'
import type { UserEntity } from '../../domain/entities/user.entity'
import type { UserPermissionsInterface } from '../../domain/interfaces/user-permissions.interface'

export async function getUserMe(): Promise<
  UserEntity & UserPermissionsInterface
> {
  const getUserMeFactory = GetUserMeFactory.create()
  return await getUserMeFactory.execute()
}
