import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
import type { UserFileInterface } from './user-file.interface'

export interface GetUserFileServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    fileId: UserFileInterface['id']
  ): Promise<Blob>
}
