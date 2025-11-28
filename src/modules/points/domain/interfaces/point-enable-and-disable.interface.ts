import type { PointEntity } from '../entities/point.entity'

export interface PointEnableAndDisableInterface {
  id?: PointEntity['id']
  enabled: boolean
}
