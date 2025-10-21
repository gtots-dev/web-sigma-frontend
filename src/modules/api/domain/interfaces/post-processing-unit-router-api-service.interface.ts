import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PostProcessingUnitRouterApiServiceInterface {
  execute(processingUnit: ProcessingUnitEntity): Promise<void>
}
