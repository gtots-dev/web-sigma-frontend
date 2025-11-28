import type { PointEntity } from '../entities/point.entity'

export interface PatchPointGateway {
  execute(point: PointEntity): Promise<void>
}
