import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from './user.interface'
import type { UserEntity } from '../entities/user.entity'

export interface PostUserServiceInterface {
  execute(
    token: TokenEntities,
    user: UserEntity,
    operationSelectedId: number
  ): Promise<void>
}
