import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PatchProcessingUnitRouterApiServiceInterface {
  execute(processingUnit: ProcessingUnitEntity): Promise<void>
}
