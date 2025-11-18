import type { PointEntity } from '@/modules/points/domain/entities/point.entity'

export interface PatchPointRouterApiGateway {
  execute(point: PointEntity): Promise<void>
}
