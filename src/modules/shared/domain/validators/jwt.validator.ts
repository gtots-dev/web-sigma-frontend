import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../../../authentication/domain/enums/status-codes.enum'
import type { JwtVerifierInterface } from '../interfaces/jwt-verifier.interface'

export class JwtValidator {
  constructor(
    private readonly jwtVerifier: JwtVerifierInterface,
    private readonly secret: string
  ) {}

  validate(token: string): void {
    if (!token) throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    try {
      this.jwtVerifier.verify(token, this.secret)
    } catch {
      throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    }
  }
}
