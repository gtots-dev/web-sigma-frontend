import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface GetUsersRouterApiGateway {
  execute(): Promise<UserEntity[]>
}
