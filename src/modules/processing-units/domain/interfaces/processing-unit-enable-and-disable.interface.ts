import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface ProcessingUnitEnableAndDisableInterface {
  id?: ProcessingUnitEntity['id']
  enabled: boolean
}
