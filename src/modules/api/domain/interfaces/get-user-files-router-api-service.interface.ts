import type { UserFileInterface } from '@/modules/users/domain/interfaces/user-file.interface'

export interface GetUserFilesRouterApiServiceInterface {
  execute(): Promise<UserFileInterface[]>
}
