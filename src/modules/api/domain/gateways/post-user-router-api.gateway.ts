import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { UserWithFiles } from '@/modules/users/domain/types/user-with-files'

export interface PostUserRouterApiGateway {
  execute(user: UserWithFiles): Promise<HttpResponseInterface<UserEntity>>
}
