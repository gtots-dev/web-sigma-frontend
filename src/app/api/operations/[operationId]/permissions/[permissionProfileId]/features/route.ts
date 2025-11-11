import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { PermissionProfileWithFeatureInterface } from '@/modules/permissions/domain/interfaces/permission-profile-with-feature.interface'
import { GetPermissionProfileFeatureFactory } from '@/modules/permissions/infrastructure/factories/get-permission-profile-feature.factory'
import { PostFeatureFactory } from '@/modules/permissions/infrastructure/factories/post-feature.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const POST = routerApi.POST<UrlParams>(
  async ({ operationId, permissionProfileId }, req) => {
    const features = await req?.json()
    const postFeature = PostFeatureFactory.create({
      operationId,
      permissionProfileId
    })
    await postFeature.execute(features)
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.CREATE
    }
  }
)

export const GET = routerApi.GET<
  UrlParams,
  PermissionProfileWithFeatureInterface[]
>(async ({ operationId, permissionProfileId }) => {
  const getPermissionProfileFeature = GetPermissionProfileFeatureFactory.create(
    {
      operationId,
      permissionProfileId
    }
  )
  const response = await getPermissionProfileFeature.execute()
  return { data: response, status: HttpStatusCodeEnum.OK }
})
