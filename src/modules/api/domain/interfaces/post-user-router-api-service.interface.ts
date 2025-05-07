import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PostUserRouterApiServiceInterface {
  execute(user: UserWithFiles): Promise<void>
}
