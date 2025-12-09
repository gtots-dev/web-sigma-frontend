import type { GroupEntity } from '../entities/group.entity'

export interface PatchGroupGateway {
  execute(group: GroupEntity): Promise<void>
}
