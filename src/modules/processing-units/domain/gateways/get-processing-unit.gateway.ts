import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface GetProcessingUnitsGateway {
  execute(): Promise<ProcessingUnitEntity[]>
}
