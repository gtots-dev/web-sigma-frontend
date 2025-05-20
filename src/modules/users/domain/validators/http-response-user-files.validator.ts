import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UserFileInterface } from '../interfaces/user-file.interface'

export class HttpResponseUserFilesValidator {
  static validate(
    success: boolean,
    response: UserFileInterface | UserFileInterface[] | null | undefined,
    status: string
  ): void {
    const isValidStatus =
      status === HttpStatusCodeEnum.OK
    if (!success || !isValidStatus) {
      throw new HttpResponseError(status)
    }
  }
}
