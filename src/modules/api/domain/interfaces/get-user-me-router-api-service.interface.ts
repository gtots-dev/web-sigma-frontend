import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface GetUserMeRouterApiServiceInterface {
  execute(): Promise<UserEntity>
}
