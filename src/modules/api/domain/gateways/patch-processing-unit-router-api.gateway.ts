import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface PatchProcessingUnitRouterApiGateway {
  execute(processingUnit: ProcessingUnitEntity): Promise<void>
}
