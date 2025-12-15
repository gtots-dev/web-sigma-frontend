import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export interface PatchGroupRouterApiGateway {
  execute(group: GroupEntity): Promise<void>
}
