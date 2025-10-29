import type { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'

export interface PatchUserStatusServiceInterface {
  execute(token: TokenEntities, userEnableAndDisable: FormData): Promise<void>
}
