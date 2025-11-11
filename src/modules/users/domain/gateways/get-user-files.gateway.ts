import type { UserFileInterface } from '../interfaces/user-file.interface'

export interface GetUserFilesGateway {
  execute(): Promise<UserFileInterface[]>
}
