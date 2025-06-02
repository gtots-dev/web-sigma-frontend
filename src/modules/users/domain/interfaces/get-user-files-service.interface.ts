import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
import type { UserFileInterface } from './user-file.interface'

export interface GetUserFilesServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id']
  ): Promise<UserFileInterface[]>
}
