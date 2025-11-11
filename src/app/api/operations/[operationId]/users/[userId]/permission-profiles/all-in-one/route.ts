import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PutUserPermissionProfileAllInOneFactory } from '@/modules/users/infrastructure/factories/put-user-permission-profiles-all-in-one.factory'

const routerApi = RouterApiFactory.create()

export const PUT = routerApi.PUT<UrlParams>(
  async ({ operationId, userId }, req) => {
    const user = await req?.json()
    const putUserPermissionProfileAllInOne =
      PutUserPermissionProfileAllInOneFactory.create({ operationId, userId })
    await putUserPermissionProfileAllInOne.execute(user)
    return { data: { success: true }, status: HttpStatusCodeEnum.OK }
  }
)
