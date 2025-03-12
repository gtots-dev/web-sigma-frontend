import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../enums/status-codes.enum'
import type { OAuthResponseInterface } from '../interfaces/o-auth-response.interface'

export class HttpResponseTokenValidator {
  static validate(
    success: boolean,
    response: OAuthResponseInterface | null | undefined,
    status: string
  ): void {
    if (!success || !response || status !== HttpStatusCodeEnum.OK) {
      throw new HttpResponseError(status)
    }
  }
}
