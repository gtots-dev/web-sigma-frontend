import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { LaneEntity } from '../entities/lane.entity'

export interface PostLaneServiceInterface {
  execute(token: TokenEntities, LaneEntity: LaneEntity): Promise<void>
}
