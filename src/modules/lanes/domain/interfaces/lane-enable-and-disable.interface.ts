import type { LaneEntity } from '../entities/lane.entity'

export interface LaneEnableAndDisableInterface {
  id?: LaneEntity['id']
  enabled: boolean
}
