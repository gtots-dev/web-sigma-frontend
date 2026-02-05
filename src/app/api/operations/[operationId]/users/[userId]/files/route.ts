import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import { GetUserFilesFactory } from '@/modules/users/infrastructure/factories/get-user-files.factory'
import { PostUserFilesFactory } from '@/modules/users/infrastructure/factories/post-user-files.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, UserFileInterface[]>(
  async ({ operationId, userId }) => {
    const getUserFilesFactory = GetUserFilesFactory.create({
      operationId,
      userId
    })
    return await getUserFilesFactory.execute()
  }
)

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, userId }, req) => {
    const files = await req?.formData()
    const postUserFilesFactory = PostUserFilesFactory.create({
      operationId,
      userId
    })
    return await postUserFilesFactory.execute(files)
  }
)
