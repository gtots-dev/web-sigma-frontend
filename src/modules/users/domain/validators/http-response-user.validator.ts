import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UserInterface } from '../interfaces/user.interface'

export class HttpResponseUserValidator {
  static validate(
    success: boolean,
    response: UserInterface | UserInterface[] | null | undefined,
    status: string
  ): void {
    const isValidStatus =
      status === HttpStatusCodeEnum.OK || status === HttpStatusCodeEnum.CREATE
    if (!success || !isValidStatus) {
      throw new HttpResponseError(status)
    }
  }
}
