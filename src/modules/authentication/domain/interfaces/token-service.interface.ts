import type { TokenEntities } from '../entities/token.entity'
import type { UserCredentialsInterface } from './user-credentials.interface'

export interface TokenServiceInterface {
  getToken(credentials: UserCredentialsInterface): Promise<TokenEntities>
}
