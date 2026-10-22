import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { StatusProcessingUnitIgnoreInterface } from '../interfaces/status-processing-unit-ignore.interface'

export interface GetStatusProcessingUnitIgnoreGateway {
  execute(): Promise<HttpResponseInterface<StatusProcessingUnitIgnoreInterface[]>>
}
