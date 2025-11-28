import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface PostPointRouterApiGateway {
  execute(point: PointEntity): Promise<void>
}
