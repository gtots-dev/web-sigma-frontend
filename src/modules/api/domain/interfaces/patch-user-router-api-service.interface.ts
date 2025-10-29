import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PatchUserRouterApiServiceInterface {
  execute(user: UserWithFiles): Promise<void>
}
