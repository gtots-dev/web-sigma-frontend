import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { DeleteFeatureFactory } from '@/modules/permissions/infrastructure/factories/delete-feature.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'

const routerApi = RouterApiFactory.create()

export const DELETE = routerApi.DELETE<UrlParams>(
  async ({ operationId, permissionProfileId, featureId }) => {
    const deleteFeature = DeleteFeatureFactory.create({
      operationId,
      permissionProfileId,
      featureId
    })
    await deleteFeature.execute()
    return {
      data: { success: true },
      status: HttpStatusCodeEnum.NO_CONTENT
    }
  }
)
