import type { ProcessingUnitEnableAndDisableInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-enable-and-disable.interface'

export interface PatchProcessingUnitStatusRouterApiGateway {
  execute(
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): Promise<void>
}
