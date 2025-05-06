import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

export interface PostUserServiceInterface {
  execute(
    token: TokenEntities,
    user: FormData,
    operationSelectedId: number
  ): Promise<void>
}
