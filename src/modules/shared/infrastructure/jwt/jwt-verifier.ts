import type { JwtVerifierGateway } from '@/modules/shared/domain/gateways/jwt-verifier.interface'
import jwt from 'jsonwebtoken'

export class JwtTokenVerifier implements JwtVerifierGateway {
  verify(token: string, secret: string): unknown {
    return jwt.verify(token, secret)
  }
}
