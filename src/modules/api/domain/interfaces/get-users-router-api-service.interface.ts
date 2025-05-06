import type { UserEntity } from '@/modules/users/domain/entities/user.entity'

export interface GetUsersRouterApiServiceInterface {
  execute(): Promise<UserEntity[]>
}
