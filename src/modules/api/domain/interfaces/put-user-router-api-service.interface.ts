import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PutUserRouterApiServiceInterface {
  execute(user: UserWithFiles): Promise<void>
}
