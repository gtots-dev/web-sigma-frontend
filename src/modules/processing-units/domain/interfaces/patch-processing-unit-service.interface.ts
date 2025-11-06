import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface PatchProcessingUnitServiceInterface {
  execute(ProcessingUnitEntity: ProcessingUnitEntity): Promise<void>
}
