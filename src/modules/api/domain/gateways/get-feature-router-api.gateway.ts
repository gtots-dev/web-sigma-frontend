import type { FeaturesInterface } from '@/modules/permissions/domain/interfaces/features.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetFeatureRouterApiGateway {
  execute(): Promise<HttpResponseInterface<FeaturesInterface[]>>
}
