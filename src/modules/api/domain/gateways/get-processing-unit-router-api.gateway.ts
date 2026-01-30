import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetProcessingUnitRouterApiGateway {
  execute(): Promise<HttpResponseInterface<ProcessingUnitEntity[]>>
}
