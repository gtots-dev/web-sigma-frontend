import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from './user.interface'

export interface GetUserMeServiceInterface {
  execute(token: TokenEntities): Promise<UserInterface>
}
