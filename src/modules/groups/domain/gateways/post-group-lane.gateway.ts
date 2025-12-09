import type { GroupLaneInterface } from '../interfaces/group-lane.interface'

export interface PostGroupLaneGateway {
  execute(laneId: GroupLaneInterface): Promise<void>
}
