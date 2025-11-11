import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface PatchProcessingUnitGateway {
  execute(ProcessingUnitEntity: ProcessingUnitEntity): Promise<void>
}
