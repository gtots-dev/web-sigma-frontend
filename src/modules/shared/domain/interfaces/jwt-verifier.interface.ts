export interface JwtVerifierInterface {
  verify(token: string, secret: string): unknown
}
