import type { PointEntity } from '../entities/point.entity'

export interface PointWithGroupInterface {
  point: PointEntity
  group_id: number[]
}
