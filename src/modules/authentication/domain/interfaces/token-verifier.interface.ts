export interface TokenVerifierInterface {
  verify(token: string, secret: string): unknown
}
