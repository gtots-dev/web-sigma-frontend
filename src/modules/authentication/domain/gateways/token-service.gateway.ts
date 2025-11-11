import type { TokenEntities } from '../entities/token.entity'
import type { UserCredentialsInterface } from '../interfaces/user-credentials.interface'

export interface TokenGateway {
  getToken(credentials: UserCredentialsInterface): Promise<TokenEntities>
}
