import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import type { UserInterface } from '../interfaces/user.interface'

export interface GetUserGateway {
  execute(
    token: TokenEntities,
    operationSelectedId: number
  ): Promise<UserInterface>
}
