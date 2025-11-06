import type { ProcessingUnitEnableAndDisableInterface } from './processing-unit-enable-and-disable.interface'

export interface PatchProcessingUnitStatusServiceInterface {
  execute(
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): Promise<void>
}
