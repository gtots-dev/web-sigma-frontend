import type { PasswordResetInterface } from '@/modules/password-reset/domain/interfaces/password-reset.interface'

export interface PutPasswordResetRouterApiGateway {
  execute({ token, newPassword }: PasswordResetInterface): Promise<void>
}
