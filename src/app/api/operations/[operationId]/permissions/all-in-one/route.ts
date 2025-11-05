import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { PostPermissionProfileAndFeaturesFactory } from '@/modules/permissions/infrastructure/factories/post-permission-profile-and-features.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(async ({ operationId }, req) => {
  const permissionProfileAndFeatures = await req?.json()
  const postPermissionProfileAndFeatures =
    PostPermissionProfileAndFeaturesFactory.create({
      operationId
    })
  await postPermissionProfileAndFeatures.execute(permissionProfileAndFeatures)
  return {
    data: { success: true },
    status: HttpStatusCodeEnum.OK
  }
})
