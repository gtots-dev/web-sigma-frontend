import type { ProcessingUnitEnableAndDisableInterface } from '../interfaces/processing-unit-enable-and-disable.interface'

export interface PatchProcessingUnitStatusGateway {
  execute(
    processingUnitEnableAndDisable: ProcessingUnitEnableAndDisableInterface
  ): Promise<void>
}
