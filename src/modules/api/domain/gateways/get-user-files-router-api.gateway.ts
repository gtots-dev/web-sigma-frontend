import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export interface GetUserFilesRouterApiGateway {
  execute(): Promise<UserFileInterface[]>
}
