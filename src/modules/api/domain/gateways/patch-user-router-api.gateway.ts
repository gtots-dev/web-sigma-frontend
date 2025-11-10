import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PatchUserRouterApiGateway {
  execute(user: UserWithFiles): Promise<void>
}
