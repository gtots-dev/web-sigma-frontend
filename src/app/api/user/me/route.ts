import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserPermissionsInterface } from '@/modules/users/domain/interfaces/user-permissions.interface'
import { GetUserMeFactory } from '@/modules/users/infrastructure/factories/get-user-me.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<
  UrlParams,
  UserEntity & UserPermissionsInterface
>(async () => {
  const getUserMe = GetUserMeFactory.create()
  return await getUserMe.execute()
})
