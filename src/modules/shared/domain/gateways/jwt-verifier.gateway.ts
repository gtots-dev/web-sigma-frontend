export interface JwtVerifierGateway {
  verify(token: string, secret: string): unknown
}
