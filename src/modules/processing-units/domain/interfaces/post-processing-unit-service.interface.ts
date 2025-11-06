import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface PostProcessingUnitServiceInterface {
  execute(processingUnitEntity: ProcessingUnitEntity): Promise<void>
}
