import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface GetUserMeRouterApiGateway {
  execute(): Promise<UserEntity>
}
