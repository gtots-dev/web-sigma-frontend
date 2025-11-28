import type { PointEntity } from '../entities/point.entity'

export interface PostPointGateway {
  execute(point: PointEntity): Promise<void>
}
