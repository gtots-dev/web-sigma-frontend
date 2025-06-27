import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class HttpResponsePermissionProfileValidator {
  static validate(success: boolean, status: string): void {
    const isValidStatus =
      status === HttpStatusCodeEnum.OK || status === HttpStatusCodeEnum.CREATE
    if (!success || !isValidStatus) {
      throw new HttpResponseError(status)
    }
  }
}
