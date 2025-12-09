import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface PostGroupPointRouterApiGateway {
  execute(pointId: PointEntity['id']): Promise<void>
}
