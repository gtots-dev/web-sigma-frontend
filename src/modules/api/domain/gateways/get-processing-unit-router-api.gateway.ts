import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface GetProcessingUnitRouterApiGateway {
  execute(): Promise<ProcessingUnitEntity[]>
}
