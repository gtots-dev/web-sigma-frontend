import type { UserPasswordResetInterface } from './user-password-reset.interface'

export interface PostUserPasswordResetServiceInterface {
  execute(userPasswordReset: UserPasswordResetInterface): Promise<void>
}
