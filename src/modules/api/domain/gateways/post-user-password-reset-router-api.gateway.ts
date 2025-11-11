import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

export interface PostUserPasswordResetRouterApiGateway {
  execute(userPasswordReset: UserPasswordResetInterface): Promise<void>
}
