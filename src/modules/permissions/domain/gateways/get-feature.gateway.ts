import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'
import type { FeaturesInterface } from '../interfaces/features.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
export interface GetFeatureGateway {
  execute(): Promise<
    HttpResponseInterface<FeaturesInterface[]> | HttpResponseErrorInterface
  >
}
