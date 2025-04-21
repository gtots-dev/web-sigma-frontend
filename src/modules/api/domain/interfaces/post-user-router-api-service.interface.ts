import type { UserEntity } from '../../../users/domain/entities/user.entity'

export interface PostUserRouterApiServiceInterface {
  execute(user: UserEntity): Promise<void>
}
