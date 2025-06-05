import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { PasswordResetFormInterface } from './password-reset-form.interface'

export interface PasswordResetInterface {
  token: TokenEntities['access_token']
  newPassword: PasswordResetFormInterface['newPassword']
}
