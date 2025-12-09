import type { GroupEnableAndDisableInterface } from '@/modules/groups/domain/interfaces/group-enable-and-disable.interface'

export interface PatchGroupStatusRouterApiGateway {
  execute(groupEnableAndDisabled: GroupEnableAndDisableInterface): Promise<void>
}
