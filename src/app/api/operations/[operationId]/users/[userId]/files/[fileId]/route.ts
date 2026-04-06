import { GetUserFileFactory } from '@/modules/users/infrastructure/factories/get-user-file.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UrlFileInterface } from '@/modules/users/domain/interfaces/url-file.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, UrlFileInterface>(
  async ({ operationId, userId, fileId }) => {
    const getUserFileFactory = GetUserFileFactory.create({
      operationId,
      userId,
      fileId
    })
    return await getUserFileFactory.execute()
  }
)
