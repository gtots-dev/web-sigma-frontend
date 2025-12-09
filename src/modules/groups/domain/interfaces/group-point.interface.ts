import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface GroupPointInterface {
  pointId: PointEntity['id'][]
}
