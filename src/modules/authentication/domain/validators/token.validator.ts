import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../enums/status-codes.enum'
import type { TokenVerifierInterface } from '../interfaces/token-verifier.interface'

export class TokenValidator {
  constructor(
    private readonly tokenVerifier: TokenVerifierInterface,
    private readonly secret: string
  ) {}

  validate(token: string): void {
    if (!token) throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    try {
      this.tokenVerifier.verify(token, this.secret)
    } catch {
      throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    }
  }
}
