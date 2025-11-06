import type { ProcessingUnitEntity } from '@/modules/processing-units/domain/entities/processing-unit.entity'

export interface GetProcessingUnitRouterApiServiceInterface {
  execute(): Promise<ProcessingUnitEntity[]>
}
