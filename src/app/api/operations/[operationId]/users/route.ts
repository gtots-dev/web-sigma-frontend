import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import { GetUsersFactory } from '@/modules/users/infrastructure/factories/get-users.factory'
import { PostUserFactory } from '@/modules/users/infrastructure/factories/post-user.factory'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(async ({ operationId }, req) => {
  const user = await req?.json()
  const postUser = PostUserFactory.create({ operationId })
  return await postUser.execute(user)
})

export const GET = routerApi.GET<UrlParams, UserEntity[]>(
  async ({ operationId }) => {
    const getUsers = GetUsersFactory.create({ operationId })
    return await getUsers.execute()
  }
)
