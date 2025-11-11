import type { JwtVerifierGateway } from '../../domain/gateways/jwt-verifier.gateway'
import jwt from 'jsonwebtoken'

export class JwtTokenVerifier implements JwtVerifierGateway {
  verify(token: string, secret: string): unknown {
    return jwt.verify(token, secret)
  }
}
