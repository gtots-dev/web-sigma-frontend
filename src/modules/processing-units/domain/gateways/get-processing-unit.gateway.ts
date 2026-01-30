import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface GetProcessingUnitsGateway {
  execute(): Promise<HttpResponseInterface<ProcessingUnitEntity[]>>
}
