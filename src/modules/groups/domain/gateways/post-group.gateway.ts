import type { GroupEntity } from '../entities/group.entity'

export interface PostGroupGateway {
  execute(group: GroupEntity): Promise<void>
}
