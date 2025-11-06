import type { ProcessingUnitEnableAndDisableInterface } from '@/modules/processing-units/domain/interfaces/processing-unit-enable-and-disable.interface'

export interface PatchProcessingUnitStatusRouterApiServiceInterface {
  execute(
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): Promise<void>
}
