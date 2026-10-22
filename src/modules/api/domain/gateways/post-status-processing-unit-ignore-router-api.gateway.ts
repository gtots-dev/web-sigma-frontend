import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type {
  PostStatusProcessingUnitIgnoreInterface,
  StatusProcessingUnitIgnoreInterface
} from '@/modules/status-processing-units/domain/interfaces/status-processing-unit-ignore.interface'

export interface PostStatusProcessingUnitIgnoreRouterApiGateway {
  execute(
    data: PostStatusProcessingUnitIgnoreInterface
  ): Promise<HttpResponseInterface<StatusProcessingUnitIgnoreInterface>>
}
