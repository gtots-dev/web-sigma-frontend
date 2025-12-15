import type { GroupSubgroupInterface } from '../interfaces/group-subgroup.interface'

export interface PostGroupSubgroupGateway {
  execute(subgroupId: GroupSubgroupInterface): Promise<void>
}
