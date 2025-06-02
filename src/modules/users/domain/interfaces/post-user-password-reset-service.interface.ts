import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserPasswordResetInterface } from './user-password-reset.interface'

export interface PostUserPasswordResetServiceInterface {
  execute(
    token: TokenEntities,
    userPasswordReset: UserPasswordResetInterface
  ): Promise<void>
}
