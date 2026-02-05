import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import type { UserFilesInterface } from '@/modules/users/domain/interfaces/user-files.interface'

export interface PostUserFilesRouterApiGateway {
  execute(files: UserFilesInterface): Promise<HttpResponseInterface<void>>
}
