import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface PostProcessingUnitGateway {
  execute(processingUnitEntity: ProcessingUnitEntity): Promise<void>
}
