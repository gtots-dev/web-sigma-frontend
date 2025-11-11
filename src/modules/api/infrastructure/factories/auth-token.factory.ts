import { AuthTokenProvider } from '../providers/token.provider'

export class AuthTokenFactory {
  static create() {
    return new AuthTokenProvider()
  }
}
