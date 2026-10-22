import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type {
  PostStatusProcessingUnitIgnoreInterface,
  StatusProcessingUnitIgnoreInterface
} from '../interfaces/status-processing-unit-ignore.interface'

export interface PostStatusProcessingUnitIgnoreGateway {
  execute(
    data: PostStatusProcessingUnitIgnoreInterface
  ): Promise<HttpResponseInterface<StatusProcessingUnitIgnoreInterface>>
}
