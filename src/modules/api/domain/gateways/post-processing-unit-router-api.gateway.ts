import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PostProcessingUnitRouterApiGateway {
  execute(processingUnit: ProcessingUnitEntity): Promise<void>
}
