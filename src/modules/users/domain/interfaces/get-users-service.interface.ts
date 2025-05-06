import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from './user.interface'

export interface GetUsersServiceInterface {
  execute(token: TokenEntities, ids?: number[]): Promise<UserInterface[]>
}
