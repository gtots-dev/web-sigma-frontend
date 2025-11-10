import type { UserPasswordResetInterface } from '../interfaces/user-password-reset.interface'

export interface PostUserPasswordResetGateway {
  execute(userPasswordReset: UserPasswordResetInterface): Promise<void>
}
