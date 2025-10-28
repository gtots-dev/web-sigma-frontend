import { auth } from '@/auth'
import type { TokenProviderInterface } from '../../domain/interfaces/token-provider.interface'
import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

export class AuthTokenProvider implements TokenProviderInterface {
  async getToken(): Promise<TokenEntities> {
    const { token } = await auth()
    return token
  }
}
