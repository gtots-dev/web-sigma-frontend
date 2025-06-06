import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserEntity } from '../entities/user.entity'
export interface PutUserServiceInterface {
  execute(
    token: TokenEntities,
    userId: UserEntity['id'],
    user: FormData
  ): Promise<void>
}
