import type { UserEnableAndDisableInterface } from '@/modules/users/domain/interfaces/user-enable-and-disable.interface'

export interface PatchUserStatusRouterApiServiceInterface {
  execute(userEnableAndDisable: UserEnableAndDisableInterface): Promise<void>
}
