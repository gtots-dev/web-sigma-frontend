import type { GroupPointInterface } from '../interfaces/group-point.interface'

export interface PostGroupPointGateway {
  execute(pointId: GroupPointInterface): Promise<void>
}
