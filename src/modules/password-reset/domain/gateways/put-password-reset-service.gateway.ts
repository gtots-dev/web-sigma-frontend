import type { PasswordResetInterface } from '../interfaces/password-reset.interface'

export interface PutPasswordResetGateway {
  execute({ token, newPassword }: PasswordResetInterface): Promise<void>
}
