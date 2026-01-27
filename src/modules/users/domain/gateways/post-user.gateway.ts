import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../entities/user.entity'

export interface PostUserGateway {
  execute(
    user: FormData
  ): Promise<HttpResponseInterface<UserEntity> | HttpResponseErrorInterface>
}
