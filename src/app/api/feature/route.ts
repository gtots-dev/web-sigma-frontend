import { GetFeatureFactory } from '@/modules/permissions/infrastructure/factories/get-feature.factory'
import { RouterApiFactory } from '@/modules/api/infrastructure/factories/router-service-api.factory'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'

const routerApi = RouterApiFactory.create()

export const GET = routerApi.GET<UrlParams, FeaturesInterface[]>(async () => {
  const getFeaturesFactory = GetFeatureFactory.create()
  return await getFeaturesFactory.execute()
})
