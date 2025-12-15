import type { GroupWithGroupInterface } from '../interfaces/group-with-group.interface'

export interface GetGroupsGateway {
  execute(): Promise<GroupWithGroupInterface[]>
}
