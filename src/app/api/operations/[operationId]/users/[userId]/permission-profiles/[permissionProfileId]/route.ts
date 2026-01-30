import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { DeleteBindUserWithPermissionProfileFactory } from '@/modules/users/infrastructure/factories/delete-bind-user-with-permission-profile.factory'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, userId, permissionProfileId }) => {
    const deleteBindUserWithPermissionProfileFactory =
      DeleteBindUserWithPermissionProfileFactory.create({
        operationId,
        userId,
        permissionProfileId
      })
    return deleteBindUserWithPermissionProfileFactory.execute()
  }
)
