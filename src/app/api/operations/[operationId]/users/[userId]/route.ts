import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { PatchUserFactory } from '@/modules/users/infrastructure/factories/patch-user.factory'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId }, req) => {
    const user = await req?.formData()
    const patchUser = PatchUserFactory.create({ operationId })
    return await patchUser.execute(user)
  }
)
