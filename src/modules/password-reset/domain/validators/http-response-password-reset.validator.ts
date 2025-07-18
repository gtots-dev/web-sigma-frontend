import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class HttpResponsePasswordResetValidator {
  static validate(success: boolean, status: string): void {
    if (
      !success ||
      !(
        status === HttpStatusCodeEnum.OK ||
        status === HttpStatusCodeEnum.NO_CONTENT
      )
    ) {
      throw new HttpResponseError(status)
    }
  }
}
