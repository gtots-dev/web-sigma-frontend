import type { GroupEntity } from '../entities/group.entity'

export interface GroupWithGroupInterface {
  group: GroupEntity
  group_id: number[]
}
