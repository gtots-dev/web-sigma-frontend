import type { GroupEnableAndDisableInterface } from '../interfaces/group-enable-and-disable.interface'

export interface PatchGroupStatusGateway {
  execute(
    groupEnabledAndDisabled: GroupEnableAndDisableInterface
  ): Promise<void>
}
