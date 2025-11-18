import type { PointEntity } from '../entities/point.entity'

export interface GetPointsGateway {
  execute(): Promise<PointEntity[]>
}
