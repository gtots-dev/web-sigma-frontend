import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface GetPointsRouterApiGateway {
  execute(): Promise<PointEntity[]>
}
