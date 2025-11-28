import type { PointWithGroupInterface } from '../interfaces/point-with-group.interface'

export interface GetPointsGateway {
  execute(): Promise<PointWithGroupInterface[]>
}
