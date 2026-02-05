import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
export interface PostUserRouterApiGateway {
  execute(user: UserEntity): Promise<HttpResponseInterface<UserEntity>>
}
