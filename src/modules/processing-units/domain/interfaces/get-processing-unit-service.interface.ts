import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface GetProcessingUnitsServiceInterface {
  execute(): Promise<ProcessingUnitEntity[]>
}
