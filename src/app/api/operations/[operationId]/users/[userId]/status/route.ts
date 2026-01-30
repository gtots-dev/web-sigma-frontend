import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchUserStatusFactory } from '@/modules/users/infrastructure/factories/patch-user-status.factory'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId }, req) => {
    const userEnableAndDisable = await req?.json()
    const patchUserStatus = PatchUserStatusFactory.create({ operationId })
    return await patchUserStatus.execute(userEnableAndDisable)
  }
)
