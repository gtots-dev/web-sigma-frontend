import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from './user.interface'

export interface PutUserServiceInterface {
  execute(token: TokenEntities, user: UserInterface): Promise<UserInterface>
}
