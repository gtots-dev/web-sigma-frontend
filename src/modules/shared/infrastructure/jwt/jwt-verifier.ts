import type { JwtVerifierInterface } from '@/modules/shared/domain/interfaces/jwt-verifier.interface'
import jwt from 'jsonwebtoken'

export class JwtTokenVerifier implements JwtVerifierInterface {
  verify(token: string, secret: string): unknown {
    return jwt.verify(token, secret)
  }
}
