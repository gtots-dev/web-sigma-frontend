import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../../../authentication/domain/enums/status-codes.enum'
import type { JwtVerifierGateway } from '../gateways/jwt-verifier.gateway'

export class JwtValidator {
  constructor(
    private readonly jwtVerifier: JwtVerifierGateway,
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
