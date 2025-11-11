import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'
import { GetUserFilesFactory } from '@/modules/users/infrastructure/factories/get-user-files.factory'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, UserFileInterface[]>(
  async ({ operationId, userId }) => {
    const getUserFilesFactory = GetUserFilesFactory.create({
      operationId,
      userId
    })
    const response = await getUserFilesFactory.execute()
    return { data: response, status: HttpStatusCodeEnum.OK }
  }
)
