import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export interface GetUserFileRouterApiServiceInterface {
  execute(
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): Promise<Blob>
}
