import type { PasswordResetInterface } from './password-reset.interface'

export interface PutPasswordResetServiceInterface {
  execute({ token, newPassword }: PasswordResetInterface): Promise<void>
}
