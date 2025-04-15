import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { OperationInterface } from '../interfaces/operation.interface'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export class HttpResponseOperationValidator {
  static validate(
    success: boolean,
    response: OperationInterface | OperationInterface[] | null | undefined,
    status: string
  ): void {    
    if (!success || !response || status !== HttpStatusCodeEnum.OK) {
      throw new HttpResponseError(status)
    }
  }
}
