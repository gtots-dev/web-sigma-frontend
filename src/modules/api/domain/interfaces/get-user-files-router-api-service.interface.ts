import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export interface GetUserFilesRouterApiServiceInterface {
  execute(userId: UserEntity['id']): Promise<UserFileInterface[]>
}
