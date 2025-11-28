import type { PointWithGroupInterface } from '@/modules/points/domain/interfaces/point-with-group.interface'

export interface GetPointsRouterApiGateway {
  execute(): Promise<PointWithGroupInterface[]>
}
