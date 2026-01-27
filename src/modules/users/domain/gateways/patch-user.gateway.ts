import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../entities/user.entity'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export interface PatchUserGateway {
  execute(
    user: FormData
  ): Promise<HttpResponseInterface<UserEntity> | HttpResponseErrorInterface>
}
