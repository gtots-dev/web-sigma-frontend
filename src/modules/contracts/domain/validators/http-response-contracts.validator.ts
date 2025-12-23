import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'

export interface HttpContractError {
  success: boolean
  status: string
  message: string
}

export class HttpResponseContractsValidator {
  static validate(
    success: boolean,
    status: string,
    message: string
  ): HttpContractError {
    const isValidStatus =
      status === HttpStatusCodeEnum.OK ||
      status === HttpStatusCodeEnum.CREATE ||
      status === HttpStatusCodeEnum.NO_CONTENT
    if (!success || !isValidStatus) {
      return { success, status, message }
    }
  }
}
