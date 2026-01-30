import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEntity } from '../entities/user.entity'

export interface PatchUserGateway {
  execute(user: FormData): Promise<HttpResponseInterface<UserEntity>>
}
