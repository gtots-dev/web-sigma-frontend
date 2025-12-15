import type { GroupWithGroupInterface } from '@/modules/groups/domain/interfaces/group-with-group.interface'

export interface GetGroupsRouterApiGateway {
  execute(): Promise<GroupWithGroupInterface[]>
}
