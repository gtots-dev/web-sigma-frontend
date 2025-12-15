import type { GroupEntity } from '../entities/group.entity'

export interface GroupSubgroupInterface {
  subgroupId: GroupEntity['id'][]
}
