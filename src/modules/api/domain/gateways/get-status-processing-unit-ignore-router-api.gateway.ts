import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { StatusProcessingUnitIgnoreInterface } from '@/modules/status-processing-units/domain/interfaces/status-processing-unit-ignore.interface'

export interface GetStatusProcessingUnitIgnoreRouterApiGateway {
  execute(): Promise<
    HttpResponseInterface<StatusProcessingUnitIgnoreInterface[]>
  >
}
