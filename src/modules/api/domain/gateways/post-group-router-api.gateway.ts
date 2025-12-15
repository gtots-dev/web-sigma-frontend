import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export interface PostGroupRouterApiGateway {
  execute(group: GroupEntity): Promise<void>
}
