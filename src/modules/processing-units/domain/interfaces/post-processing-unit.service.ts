import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { ProcessingUnitEntity } from '../entities/processing-unit.entity'

export interface PostProcessingUnitServiceInterface {
  execute(
    token: TokenEntities,
    ProcessingUnitEntity: ProcessingUnitEntity
  ): Promise<void>
}
