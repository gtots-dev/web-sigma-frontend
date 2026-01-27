import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserEnableAndDisableInterface } from '../interfaces/user-enable-and-disable.interface'
import type { HttpResponseErrorInterface } from '@/modules/shared/domain/interfaces/http-response-error.interface'

export interface PatchUserStatusGateway {
  execute(
    userEnableAndDisable: UserEnableAndDisableInterface
  ): Promise<HttpResponseInterface<void> | HttpResponseErrorInterface>
}
