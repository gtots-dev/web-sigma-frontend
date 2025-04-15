import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import type { UserInterface } from '../interfaces/user.interface'

export class HttpResponseUserValidator {
  static validate(
    success: boolean,
    response: UserInterface | UserInterface[] | null | undefined,
    status: string
  ): void {    
    if (!success || !response || status !== HttpStatusCodeEnum.OK) {
      throw new HttpResponseError(status)
    }
  }
}
