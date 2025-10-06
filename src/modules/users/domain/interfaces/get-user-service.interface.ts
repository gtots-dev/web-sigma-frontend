import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from './user.interface'

export interface GetUserServiceInterface {
  execute(
    token: TokenEntities,
    operationSelectedId: number
  ): Promise<UserInterface>
}
