import type { TokenVerifierInterface } from '@/modules/authentication/domain/interfaces/token-verifier.interface'
import jwt from 'jsonwebtoken'

export class JwtTokenVerifier implements TokenVerifierInterface {
  verify(token: string, secret: string): unknown {
    return jwt.verify(token, secret)
  }
}
