import type { GroupEntity } from '@/modules/groups/domain/entities/group.entity'

export interface PostGroupSubgroupRouterApiGateway {
  execute(subgroupId: GroupEntity['id']): Promise<void>
}
