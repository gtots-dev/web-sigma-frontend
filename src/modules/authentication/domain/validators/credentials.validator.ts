import type { UserCredentialsInterface } from '../interfaces/user-credentials.interface'
import { HttpStatusCodeEnum } from '../enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

export class CredentialsValidator {
  static validate({ username, password }: UserCredentialsInterface): void {
    if (!username || !password) {
      throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    }
  }
}
