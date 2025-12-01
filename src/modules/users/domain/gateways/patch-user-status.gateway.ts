import type { UserEnableAndDisableInterface } from '../interfaces/user-enable-and-disable.interface'

export interface PatchUserStatusGateway {
  execute(userEnableAndDisable: UserEnableAndDisableInterface): Promise<void>
}
