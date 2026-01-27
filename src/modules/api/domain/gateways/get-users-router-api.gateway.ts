import type { UserEntity } from '@/modules/users/domain/entities/user.entity'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'

export interface GetUsersRouterApiGateway {
  execute(): Promise<HttpResponseInterface<UserEntity[]>>
}
