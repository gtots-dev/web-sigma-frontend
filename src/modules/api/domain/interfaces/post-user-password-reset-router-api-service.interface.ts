import type { UserPasswordResetInterface } from '@/modules/users/domain/interfaces/user-password-reset.interface'

export interface PostUserPasswordResetRouterApiServiceInterface {
  execute(userPasswordReset: UserPasswordResetInterface): Promise<void>
}
