import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'
import { HttpStatusCodeEnum } from '../../domain/enums/status-codes.enum'

export class AuthMessagesError {
  private static errorsMap: Record<string, string> = {
    [HttpStatusCodeEnum.UNAUTHORIZED]: MESSAGES_AUTHENTICATION['1.5'],
    [HttpStatusCodeEnum.INTERNAL_SERVER_ERROR]: MESSAGES_AUTHENTICATION['1.14']
  }

  static message(code: string): string | null {
    return this.errorsMap[code] ?? null
  }
}
