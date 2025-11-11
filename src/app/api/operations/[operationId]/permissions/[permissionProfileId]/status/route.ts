import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PatchPermissionProfileStatusFactory } from '@/modules/permissions/infrastructure/factories/put-permission-profile-status.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const PATCH = routerApi.PATCH<UrlParams>(
  async ({ operationId, permissionProfileId }, req) => {
    const permissionProfileEnableAndDisable = await req?.json()
    const patchPermissionProfileStatus =
      PatchPermissionProfileStatusFactory.create({
        operationId,
        permissionProfileId
      })
    await patchPermissionProfileStatus.execute(
      permissionProfileEnableAndDisable
    )
    return { data: { success: true }, status: HttpStatusCodeEnum.OK }
  }
)
